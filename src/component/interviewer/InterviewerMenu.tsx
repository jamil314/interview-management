import React, { useState } from "react";
import { LayoutFilled, ScheduleFilled } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import CalendarComponent from "./CalendarComponent";
import InterviewerHome from "./InterviewerHome";
import Image from "next/image";
import logo2 from "src/resources/logo2.jpg";

const { Sider } = Layout;

const InterviewerMenu: React.FC = () => {
  const pages: React.ReactNode[] = [
    <InterviewerHome key="interviewer-home" />,
    <CalendarComponent key="calendar-component" />,
  ];

  const [page, setPage] = useState<React.ReactNode>(pages[0]);

  const changePage = (pageIdx: number) => {
    setPage(pages[pageIdx]);
  };

  const siderMenuItems: MenuProps["items"] = [
    {
      key: 0,
      icon: <LayoutFilled />,
      label: "Home",
    },
    {
      key: 1,
      icon: <ScheduleFilled />,
      label: "Schedule",
    },
  ];

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          className="logo"
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <Image src={logo2} alt="logo" width={32} height={32} />
        </div>
        <Menu
          onClick={(e) => changePage(parseInt(e.key))}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          items={siderMenuItems}
        />
      </Sider>
      {page}
    </Layout>
  );
};

export default InterviewerMenu;
