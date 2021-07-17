import { Form, Input, Button, Checkbox, message } from "antd";
import Cookies from "js-cookie";
import { ApiLogin } from "../api";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const Router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    await ApiLogin(values, async (data, error) => {
      setLoading(false);
      if (error) return message.error("Invalid Credentials");
      await Cookies.set("adminToken", data.token);
      await Cookies.set("admin", JSON.stringify(data.admin));
      Router.push("/");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <Form
        className="login-form"
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <p>Email</p>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="name@domain.com" size="large" />
        </Form.Item>
        <p>Password</p>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="***********" size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            disabled={loading}
            size="large"
            className="submit-btn"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
