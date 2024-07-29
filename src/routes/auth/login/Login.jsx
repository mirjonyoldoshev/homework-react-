import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

import { saveToLocalStorage } from "../../../helpers/saveToLS";
import { ERROR, LOADING, LOGIN_SUCCESS } from "../../../redux/actions/types";

import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isToken, setIsToken] = useState(false);

  const onFinish = async (values) => {
    try {
      dispatch({ type: LOADING });
      const res = await axios.post("/auth/login", values);
      const data = res.data.payload;
      if (res.status === 200 && data.token) {
        notification.success({
          message: "Kirdiz",
          description: "Tog'ri kirdiz, O'LOV.",
        });
        dispatch({ type: LOGIN_SUCCESS, user: data.user, token: data.token });
        saveToLocalStorage("user", data.user);
        saveToLocalStorage("token", data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
        setIsToken(true);
      } else {
        throw new Error("Nimadir neto ketdi");
      }
      form.resetFields();
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        message: error.response?.data?.message || error.message,
      });
      notification.error({
        message: "Kirolmadiz",
        description: error.response?.data?.message || "Nimadir neto ketdi.",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-indigo-200">
      <div className="flex w-max flex-col items-center justify-center gap-4 rounded-2xl bg-indigo-50 p-5">
        <h2 className="text-3xl font-semibold uppercase">Log in</h2>

        <Form
          form={form}
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
          size="large"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
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
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            className="flex w-full items-center justify-center"
            wrapperCol={{}}
          >
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <Button type="primary" htmlType="submit" disabled={isToken}>
                Log In
              </Button>

              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const decodedData = JSON.parse(
                    atob(credentialResponse.credential.split(".")[1]),
                  );
                  const user = {
                    username: decodedData.email,
                    password: decodedData.sub,
                  };
                  try {
                    dispatch({ type: LOADING });
                    const res = await axios.post("/auth/login", user);
                    const data = res.data.payload;
                    if (res.status === 200 && data.token) {
                      notification.success({
                        message: "Gmail orqali kirish",
                        description: "Gmail orqali muvafaqiyatli kirildi.",
                      });
                      dispatch({
                        type: LOGIN_SUCCESS,
                        user: data.user,
                        token: data.token,
                      });
                      saveToLocalStorage("user", data.user);
                      navigate("/dashboard");
                    } else {
                      throw new Error("Nimadir neto ketdi");
                    }
                    form.resetFields();
                  } catch (error) {
                    console.log(error);
                    dispatch({
                      type: ERROR,
                      message: error.response?.data?.message || error.message,
                    });
                    notification.error({
                      duration: 2,
                      message: "Kirolmadiz",
                      description:
                        error.response?.data?.message || "Nimadir neto ketdi.",
                    });
                  }
                }}
                onError={() => {
                  console.log("Kirolmadiz");
                }}
              />

              <div className="">
                or{" "}
                <NavLink to={"/auth/register"} className="text-blue-500">
                  register your account
                </NavLink>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
