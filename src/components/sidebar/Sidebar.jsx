import { ImExit } from "react-icons/im";
import { FiSettings } from "react-icons/fi";
import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Layout,
  Menu,
  Modal,
  Skeleton,
  Typography,
  notification,
} from "antd";
import { UserOutlined, ProductOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SIGN_OUT } from "../../redux/actions/types";
import "./Sidebar.css";

const { Text } = Typography;
const { Sider } = Layout;

const Sidebar = ({ collapsed, userProfileData, loading }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Chiqib ketasiz akkauntdan maylimi?",
  );

  const handleOk = () => {
    setModalText("Akkauntdan chiqdiz");

    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      dispatch({ type: SIGN_OUT });
      navigate("/auth");

      notification.success({
        message: "Akkauntdan chiqish",
        description: "Muvaffaqiyatli akkauntdan chiqdingiz.",
      });
    }, 1000);
  };

  const data = JSON.parse(localStorage.getItem("user"));

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setOpen(true);
  };
  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="px-2 pb-7 pt-1"
      >
        <div className="flex items-center gap-5 p-3">
          <Badge size="large" count={17}>
            {loading ? (
              <Skeleton.Avatar active size={40} />
            ) : (
              <Avatar
                src={userProfileData?.avatar}
                className="bg-indigo-900"
                size={40}
              >
                {data?.first_name[0]}
              </Avatar>
            )}
          </Badge>
          <Text className="mt-1 flex flex-col gap-1 overflow-hidden whitespace-nowrap text-white">
            {loading ? (
              <Skeleton.Input
                className="h-6 max-w-[100px] bg-blue-900 leading-normal"
                active
                size="small"
              />
            ) : (
              <span className="text-[16px] font-bold">{data?.first_name}</span>
            )}
            {loading ? (
              <Skeleton.Input
                className="h-3 max-w-[60px] bg-blue-900"
                active
                size="small"
              />
            ) : (
              <span className="text-[12px] font-bold">
                {userProfileData?.role === "user" ? "Foydalanuvchi" : "Admin"}
              </span>
            )}
          </Text>
        </div>
        <div className="flex h-auto flex-1 flex-col justify-between">
          <Menu
            theme="dark"
            mode="inline"
            items={[
              {
                key: "1",
                icon: <ProductOutlined />,
                label: (
                  <NavLink end to="/dashboard">
                    Mahsulotlar
                  </NavLink>
                ),
              },
              {
                key: "2",
                icon: <UserOutlined />,
                label: (
                  <NavLink to="/dashboard/users">Foydalanuvchilar</NavLink>
                ),
              },
              {
                key: "3",
                icon: <FiSettings />,
                label: <NavLink to="/dashboard/account">Akkaunt</NavLink>,
              },
            ]}
          />
          <Button
            className="mx-2 mt-auto whitespace-normal"
            danger
            type="primary"
            onClick={handleSignOut}
          >
            <span>
              <ImExit />
            </span>
            {!collapsed && (
              <span className="whitespace-nowrap text-[12px]">Chiqish </span>
            )}
          </Button>
        </div>
      </Sider>
      <Modal
        maskClosable={false}
        title="Akkauntdan chiqish"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default Sidebar;
