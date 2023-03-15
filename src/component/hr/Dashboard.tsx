import React, { useState } from "react";
import {
  AuditOutlined,
  ContainerOutlined,
  SoundOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import dash from "./Dashboard.module.scss";
// import style from '../../styles/ant_force.module.css'

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  danger?: boolean,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    danger,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Applications", 0, <ContainerOutlined />),
  getItem("Shortlisted", 1, <AuditOutlined />),
  getItem("Job Postings", 2, <SoundOutlined />),
  getItem("Interviewers", 3, <TeamOutlined />),
  getItem("Log out", "logOut", <PoweroffOutlined />, true),
  // getItem('Navigation One', 'sub1', <MailOutlined />, [
  //     getItem('Option 5', '5'),
  //     getItem('Option 6', '6'),
  //     getItem('Option 7', '7'),
  //     getItem('Option 8', '8'),
  // ]),
];

interface props {
  changeContent: (contentId: number) => void;
}

const Dashboard: React.FC<props> = ({ changeContent }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className={dash.container}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            padding: "0",
            width: "calc(100% - 10px)",
            margin: "0 20px 0 -10px",
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          onClick={({ key }) => {
            if (key == "logOut") window.location.href = "/";
            else changeContent(Number(key));
          }}
          className={dash.menu}
          id="hr-menu"
          defaultSelectedKeys={["0"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div
        className={dash.overlay}
        style={{ left: collapsed ? 70 : 162 + "px", transition: "300ms ease" }}
      />
    </>
  );
};

export default Dashboard;
