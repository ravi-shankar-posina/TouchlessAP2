import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import invoice from "../assets/3165354060.pdf";
import invoice1 from "../assets/3165378098.pdf";
import invoice2 from "../assets/3165378198.pdf";
import invoice3 from "../assets/3165378918.pdf";

import {
  CloudDownloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SaveOutlined,
  CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Tablecomponet = ({
  DBdata,
  PDFdata,
  setDBdata,
  setPDFdata,
  successData,
  setSuccessData,
  failedData,
  setFailedData,
  currentTable,
  setCurrentTable,
}) => {
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const [form] = Form.useForm();
  // console.log("DBdata: ", DBdata);

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setCurrentPrice(record.price);
    setCurrentStatus(record.status);
    setEditingKey(record.key);
  };

  const validateData = (poNum, item, qty, amount, status) => {
    if (Array.isArray(DBdata)) {
      const dbRecord = DBdata.find((data) => {
        // console.log("Checking record:", data.poNum);
        return data.poNum === poNum && data.item === item;
      });
      // console.log("dbRecord: ", dbRecord);

      if (status === "Qty-Mismatch") {
        return dbRecord && dbRecord.qty == qty ? true : `Current Quantity`;
      } else if (status === "Amount-Mismatch") {
        return dbRecord && dbRecord.amount == amount ? true : `Current Amount`;
      } else if (status === "Qty / Amount-Mismatch") {
        return dbRecord && dbRecord.qty == qty && dbRecord.amount == amount
          ? true
          : `Current Quantity
         and Current Amount`;
      }

      return true;
    } else {
      console.error("pdfData is not an array");
    }
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...failedData];
      const index = newData.findIndex((item) => key === item.key);
      const record = newData[index];

      const validationMessage = validateData(
        record.poNum,
        record.Item,
        row.qty,
        row.amount,
        record.status
      );
      // console.log("validationMessage: ", validationMessage);

      if (validationMessage !== true) {
        message.error(`Provide the ${validationMessage}`);
        return;
      }

      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          qty: row.qty !== undefined ? row.qty : item.qty,
          amount: row.amount !== undefined ? row.amount : item.amount,
          status: "Successfully Process",
        };

        try {
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/api/updatePdfData/${item._id}`,
            {
              qty: row.qty,
              amount: row.amount,
              status: "Successfully Process",
            }
          );

          if (response.status === 200) {
            message.success("Document updated successfully");
            const filtered = newData.filter((item) => item.key !== key);
            setFailedData(filtered);
            setSuccessData((prev) => [...prev, updatedItem]);
            setEditingKey("");
          }
        } catch (error) {
          message.error("Error updating document");
          console.error("Error updating document:", error);
        }
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const onCancel = () => {
    setEditingKey("");
  };

  const handlePdfDownload = (poNumber) => {
    // console.log("poNumber: ", poNumber);
    const poToPdfMap = {
      3165354060: invoice,
      3165378098: invoice1,
      3165378198: invoice2,
      3165378918: invoice3,
      // Add more PO numbers and their corresponding PDF URLs here
    };
    // console.log("poToPdfMap: ", poToPdfMap);

    const pdfUrl = poToPdfMap[poNumber];
    // console.log("pdfUrl: ", pdfUrl);

    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${poNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(pdfUrl);
    } else {
      alert("PDF not found for the given PO number.");
    }
  };
  const successColumns = [
    {
      title: "Purchasing Document",
      dataIndex: "poNum",
      key: "poNum",
      width: 200,
    },
    {
      title: "Item",
      dataIndex: "Item",
      key: "Item",
    },
    {
      title: "Material",
      dataIndex: "Material",
      key: "Material",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const failedColumns = [
    {
      title: "Purchasing Document",
      dataIndex: "poNum",
      key: "poNum",
      width: 200,
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Material",
      dataIndex: "Material",
      key: "Material",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      editable:
        currentStatus === "Qty-Mismatch" ||
        currentStatus === "Qty / Amount-Mismatch",
      key: "qty",
      width: 150,
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      editable:
        currentStatus === "Amount-Mismatch" ||
        currentStatus === "Qty / Amount-Mismatch",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className="font-semibold text-red-500"
          style={{ fontWeight: 600, color: "red" }}
        >
          {status}
        </span>
      ), // Render the status
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              <SaveOutlined style={{ fontSize: 16 }} />
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => {
                setEditingKey("");
              }}
            >
              <a>
                <CloseCircleOutlined style={{ fontSize: 16, marginLeft: 25 }} />
              </a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            <EditOutlined style={{ fontSize: 18, marginLeft: 20 }} />
          </Typography.Link>
        );
      },
      width: 130,
    },
    {
      title: "Document",
      dataIndex: "doc",
      key: "doc",
      render: (text, record) => {
        return (
          <div>
            <Typography.Link>
              <CloudDownloadOutlined
                style={{ fontSize: 18, marginLeft: 25 }}
                onClick={() => handlePdfDownload(record.poNum)}
              />
            </Typography.Link>
          </div>
        );
      },
    },
  ];

  const mergedColumns = failedColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    // console.log("record: ", col);
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const handleRefresh = () => {
    setTimeout(window.location.reload(), 5000);
  };
  const [dateString, setDateString] = useState(getFormattedDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateString(getFormattedDate());
    }, 1000); // Update dateString every second (1000 milliseconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  function getFormattedDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {" "}
        <div style={{}}>
          <Button
            style={{ width: 85, marginLeft: 10, marginBottom: 10 }}
            onClick={handleRefresh}
          >
            Pre-Process
          </Button>
          <Button
            style={{ width: 85, marginLeft: 10, marginBottom: 10 }}
            onClick={() => setCurrentTable("Fail")}
          >
            Verify
          </Button>
          <Button
            style={{ width: 85, marginLeft: 10 }}
            onClick={() => setCurrentTable("Success")}
          >
            Success
          </Button>
        </div>
      </div>
      <span
        style={{
          display: "flex",
          justifyContent: "start",
          fontWeight: "400",
          marginBottom: "10px",
        }}
      >
        Date: {dateString}
      </span>
      {currentTable === "Success" ? (
        <div>
          <Table dataSource={successData} columns={successColumns} />
        </div>
      ) : (
        <div>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              dataSource={failedData}
              columns={mergedColumns}
              rowClassName="editable-row"
            />
          </Form>
        </div>
      )}
    </div>
  );
};

export default Tablecomponet;
