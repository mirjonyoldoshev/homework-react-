import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

import { saveToLocalStorage } from "../../../helpers/saveToLS";
import { ERROR, LOADING, REGISTER_SUCCESS } from "../../../redux/actions/types";

import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isToken, setIsToken] = useState(false);

  const onFinish = async (values) => {
    try {
      dispatch({ type: LOADING });
      const res = await axios.post("/auth", values);
      const data = res.data.payload;
      if (res.status === 200 && data.token) {
        notification.success({
          message: "Kirdiz",
          description: "Tog'ri kirdiz, O'LOV.",
        });
        dispatch({
          type: REGISTER_SUCCESS,
          user: data.user,
          token: data.token,
        });
        saveToLocalStorage("token", data.token);
        setTimeout(() => {
          navigate("/auth");
        }, 1000);
        setIsToken(true);
      } else {
        throw new Error({ message: "Nimadur neto ketdi" });
      }
      form.resetFields();
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, message: error.res.data.message || error });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-indigo-200">
      <div className="flex w-max flex-col items-center justify-center gap-4 rounded-2xl bg-indigo-50 p-5">
        <h2 className="text-3xl font-semibold uppercase">Register</h2>
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
            label="Firstname"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
                Register
              </Button>

              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const decodedData = JSON.parse(
                    atob(credentialResponse.credential.split(".")[1]),
                  );
                  const user = {
                    first_name: decodedData.given_name,
                    username: decodedData.email,
                    password: decodedData.sub,
                  };
                  try {
                    dispatch({ type: LOADING });
                    const res = axios.post("/auth", user);
                    const data = res.data.payload;
                    if (res.status === 200 && data.token) {
                      notification.success({
                        message: "Registration Successful",
                        description: "You have successfully registered in.",
                      });
                      dispatch({
                        type: REGISTER_SUCCESS,
                        user: data.user,
                        token: data.token,
                      });
                      navigate("/dashboard");
                    } else {
                      throw new Error("Something went wrong");
                    }
                  } catch (error) {
                    console.log(error);
                    dispatch({
                      type: ERROR,
                      message: error.response?.data?.message || error.message,
                    });
                    notification.error({
                      message: "Registration Failed",
                      description: "Something went wrong.",
                    });
                  }
                }}
                onError={() => {
                  console.log("Register Failed");
                }}
              />

              <div className="">
                or{" "}
                <NavLink to={"/auth"} className="text-blue-500">
                  log in
                </NavLink>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
