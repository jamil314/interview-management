import InvisibleDivider from "@/component/InvisibleDivider";
import { Calendar, Col, Divider, Layout, Row, theme } from "antd";
import React from "react";
import DashboardButton from "./DashboardButton";
import DashboardCards from "./DashboardCards";
import DashboardTopbar from "./DashboardTopbar";
import NotificationBox from "./NotificationBox";

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
        <InvisibleDivider />
        <Row gutter={24} justify="space-around">
          <Col span={11}>
            <DashboardButton />
            <InvisibleDivider />
            <Calendar fullscreen={false} />
          </Col>

          <Col span={12}>
            <h2>
              <NotificationBox />
            </h2>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default HRDashBoard;
