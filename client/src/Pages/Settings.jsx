import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Input,
  Select,
  message,
  Form,
  Table,
  Modal,
  Checkbox,
} from "antd";
import Layout from "../components/Layout";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

function Settings() {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState("");
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/registerUser`,
        values
      );
      if (response.data.success) {
        message.success(response.data.message);
        form.resetFields(); // Clear form fields on success
      } else {
        message.error(response.data.message || "An error occurred.");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          "An error occurred while registering the user.";
        message.error(errorMessage);
      } else if (error.request) {
        message.error("No response from the server.");
      } else {
        message.error("Error: " + error.message);
      }
    }
    getUser();
    setIsModalOpen(false);
  };

  const getUser = async (values) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/getusers`,
      {}
    );
    setUserData(res.data);
  };
  useEffect(() => {
    getUser();
  }, []);
  const columns = [
    { title: "User Name", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Active/Inactive",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div style={{ display: "flex", marginLeft: 20 }}>
          <Checkbox />
        </div>
      ),
    },
    { title: "Vendor", dataIndex: "vendor", key: "vendor" },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout>
      <div
        style={{
          width: "100%",
          // alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Admin Settings</h1>
        <span
          style={{ display: "flex", justifyContent: "end", marginRight: 25 }}
        >
          <Button onClick={showModal} type="primary">
            Add User <PlusOutlined />
          </Button>
        </span>
        <div style={{ padding: 20 }}>
          <Table
            pagination={false}
            bordered
            dataSource={userData}
            columns={columns}
          />
        </div>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {" "}
          <div style={{ padding: 40, height: 400 }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              // style={{ width: "100%" }}
            >
              <Form.Item
                label="Enter User Email:"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "The input is not valid E-mail!" },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label="Enter User Password:"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Enter Username:"
                name="username"
                rules={[
                  { required: true, message: "Please enter your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Enter Vendor Details:"
                name="vendor"
                rules={[
                  {
                    required: true,
                    message: "Please enter the vendor details!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Enter User Role:"
                name="role"
                rules={[{ required: true, message: "Please select a role!" }]}
              >
                <Select
                  placeholder="Select a Role here..."
                  style={{
                    // width: 200,
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  <Option value="admin">Admin</Option>
                  <Option value="super-admin">Super Admin</Option>
                  <Option value="user">Analyst</Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}

export default Settings;
