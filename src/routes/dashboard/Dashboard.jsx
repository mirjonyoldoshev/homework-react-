import { Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { useFetch } from "../../hooks/useFetch";

const { Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [data, loading] = useFetch("/auth/profile");

  return (
    <Layout className="min-h-screen">
      <Sidebar
        collapsed={collapsed}
        userProfileData={data?.payload}
        loading={loading}
      />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="mx-4 my-6 min-h-[280px] rounded-xl bg-white p-6 shadow">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
