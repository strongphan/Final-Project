import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { message } from "antd";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../services/Auth";
const LoginPage = () => {
  const { user, setIsAuthenticated } = useAuthContext();
  const navigator = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await apiLogin(values);
      if (response.data.flag) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("userId", response?.data?.userId);
        setIsAuthenticated(true);
        message.success(response.data.message);
        if (user.role === "Admin") {
          navigator("/books");
        } else {
          navigator("/home");
        }
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Form submission failed. Please check your inputs.");
  };
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Form
        className="Form"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            // {
            //   pattern:
            //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            //   message:
            //     "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one symbol.",
            // },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginPage;
