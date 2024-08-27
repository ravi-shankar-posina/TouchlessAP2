import {
  Modal,
  Form,
  Button,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Tooltip,
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
  CommentOutlined,
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
  console.log("DBdata: ", PDFdata.comment);
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [comment, setComment] = useState("");
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
  // Function to handle comment click
  const handleComment = (record) => {
    setCurrentRecord(record); // Set the record to be used in the modal

    // Initialize comment state with the existing comment or an empty string if no comment exists
    setComment(record.comment || "");

    setIsModalVisible(true); // Show the modal
  };

  // Function to handle OK button in modal
  const handleOk = async () => {
    if (currentRecord) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/updatePdfDataComment/${currentRecord._id}`,
          {
            comment: comment,
          }
        );

        if (response.status === 200) {
          console.log("Comment updated successfully:", response.data.pdfData);
          // Optionally, you can update the table or show a success message
        }
      } catch (error) {
        console.error(
          "Error updating comment:",
          error.response ? error.response.data : error.message
        );
      }
    }

    setIsModalVisible(false); // Hide the modal after submission
  };

  // Function to handle Cancel button in modal
  const handleCancel = () => {
    setIsModalVisible(false); // Hide the modal
  };

  // Function to handle comment change in form
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const validateData = (poNum, item, qty, amount, status) => {
    console.log("item: ", item);
    console.log("poNum: ", poNum);
    if (Array.isArray(DBdata)) {
      console.log("DBdata: ", DBdata);
      const dbRecord = DBdata.find((data) => {
        console.log("data: ", data.item);
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
      console.log("row: ", row);
      const newData = [...failedData];
      const index = newData.findIndex((item) => key === item.key);
      const record = newData[index];

      const validationMessage = validateData(
        record.poNum,
        record.item,
        row.qty,
        row.amount,
        record.status
      );

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
              qty: row.qty !== undefined ? parseInt(row.qty) : item.qty, // Ensure qty is sent as an integer
              amount: row.amount !== undefined ? row.amount : item.amount,
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
      dataIndex: "item",
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
        const editable = isEditing(record); // Assuming isEditing function is defined elsewhere

        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)} // Assuming save function is defined elsewhere
              style={{ marginRight: 8 }}
            >
              <SaveOutlined style={{ fontSize: 16 }} />
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => setEditingKey("")} // Assuming setEditingKey function is defined elsewhere
            >
              <a>
                <CloseCircleOutlined style={{ fontSize: 16, marginLeft: 25 }} />
              </a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Tooltip title="Edit" placement="top">
              <Typography.Link
                disabled={editingKey !== ""} // Assuming editingKey state is defined elsewhere
                onClick={() => edit(record)} // Assuming edit function is defined elsewhere
              >
                <EditOutlined style={{ fontSize: 18 }} />
              </Typography.Link>
            </Tooltip>
            <Tooltip title="Add Comment" placement="top">
              <Typography.Link
                style={{ marginLeft: 20 }}
                onClick={() => handleComment(record)}
              >
                <CommentOutlined style={{ fontSize: 18 }} />
              </Typography.Link>
            </Tooltip>
          </span>
        );
      },
      width: 180,
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
      <Modal
        title={`Comment for Record ${currentRecord?.key}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form>
          <Form.Item>
            <Input.TextArea
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              placeholder="Enter your comment here..."
            />
          </Form.Item>
        </Form>
      </Modal>
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
        <div style={{ height: "screen" }}>
          <Table
            dataSource={successData}
            columns={successColumns}
            pagination
            scroll={{ y: 600 }}
          />
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
