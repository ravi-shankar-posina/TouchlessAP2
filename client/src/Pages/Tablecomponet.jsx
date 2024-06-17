import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";

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
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const [form] = Form.useForm();

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...failedData];
      const index = newData.findIndex((item) => key === item.key);
      console.log("index: ", index);

      if (index > -1) {
        const item = newData[index];

        const filtered = newData.filter((item) => item.key !== key);
        setFailedData(filtered);

        setSuccessData((prev) => [
          ...prev,
          {
            ...item,
            price: row.price,
            Amount: row.Amount,
            status: "Successfully Process",
          },
        ]);

        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const onCancel = () => {
    setEditingKey("");
  };

  const successColumns = [
    {
      title: "Purchasing Document",
      dataIndex: "poNum",
      key: "poNum",
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
      dataIndex: "Amount",
      key: "Amount",
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
      editable: true,
      width: 200,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      editable: true,
      width: 200,
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
              Save
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => {
                setEditingKey("");
              }}
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
      width: 200,
    },
  ];

  const mergedColumns = failedColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
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

  return (
    <div>
      <Button style={{ width: 85 }} onClick={() => setCurrentTable("Success")}>
        Success
      </Button>
      <Button
        style={{ width: 85, marginLeft: 10, marginBottom: 10 }}
        onClick={() => setCurrentTable("Fail")}
      >
        Verify
      </Button>
      <Button
        style={{ width: 85, marginLeft: 10, marginBottom: 10 }}
        onClick={() => setCurrentTable("")}
      >
        Pre-Process
      </Button>
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
