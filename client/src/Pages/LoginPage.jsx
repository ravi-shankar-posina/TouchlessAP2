import React, { useContext, useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Picture1 from "../assets/Picture1.png";
import bg from "../assets/bg.jpeg";
import { MyContext } from "../components/AuthProvider";

const { Title } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(MyContext);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.data.success) {
        const loginDetails = {
          username: response.data.data.username,
          token: response.data.token,
          role: response.data.data.role,
          vendor: response.data.data.vendor,
        };
        console.log("response: ", response);

        // Save login details to localStorage
        localStorage.setItem("isLogin", JSON.stringify(loginDetails));

        // Set auth context
        setAuth(loginDetails);

        // Redirect to home page
        navigate("/home");
      } else {
        setError(response.data.message || "Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        // backgroundImage: `url(${bg})`,
        // backgroundSize: "cover",
        backgroundPosition: "center",
        // height: "100vh",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        marginTop: 120,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#efefef",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "100%",
          width: "450px",
          height: "550px",
        }}
      >
        <img
          src={Picture1}
          alt="AI Labs Logo"
          style={{
            height: "120px",
            width: "auto",
            marginBottom: "20px",
          }}
        />
        <span
          style={{
            fontSize: 20,
            color: "#575757",
            marginBottom: "40px",
          }}
        >
          Signin here...
        </span>
        <div style={{ width: 400 }}>
          <Form
            form={form}
            onFinish={handleSubmit}
            style={{ width: "100%" }}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginTop: 20 }}
              >
                Signin
              </Button>
            </Form.Item>
            <Form.Item>
              <a
                href="#"
                style={{ color: "blue", display: "block", textAlign: "center" }}
              >
                Forgot Password?
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
