import { Col, Layout, Row, theme } from "antd";
import React from "react";
import hr from "../hr/hr.module.scss";
import TopBar from "../../TopBar";
import DashboardCards from "./DashboardCards";
import AvatarDropdown from "@/component/interviewer/AvatarDropdown";
import DashboardTopbar from "./DashboardTopbar";

const { Header, Content, Footer } = Layout;

const HRDashBoard = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      className="manager-dashboard-layout"
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
    >
      <Header
        className="hr-dashboard-header"
        style={{
          width: "match-parent",
          height: 128,
          padding: 0,
          margin: "12px 8px 0",
          borderRadius: 12,
          background: colorBgContainer,
        }}
      >
        <DashboardTopbar bigText="Hello bayjed" smallText="how u doin" />
      </Header>
      <Content style={{ margin: "24px 16px 0" }}>
        <DashboardCards
          props={[
            { bigText: "4", smallText: "New Interviews" },
            { bigText: "2", smallText: "New Applications" },
            { bigText: "60", smallText: "Nine" },
          ]}
        />
      </Content>
    </Layout>
  );
};

export default HRDashBoard;
