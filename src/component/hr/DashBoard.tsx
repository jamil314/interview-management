import { Card, Col, Layout, Row, theme, Typography } from "antd";
import React from "react";
import hr from "../hr/hr.module.scss";
import TopBar from "../TopBar";

type Props = {};

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const DashBoard = (props: Props) => {
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
        <Row align="middle" justify="center">
          <Col span={22}>
            <Row>
              <Col offset={1}>
                <h2>Hello bayjed</h2>
              </Col>
            </Row>
            <Row>
              <Col offset={1}>
                <h4>how u doin</h4>
              </Col>
            </Row>
          </Col>
          <Col span={2}> avatar</Col>
        </Row>
      </Header>
      <Content style={{ margin: "24px 16px 0" }}>
        <Row gutter={16} justify="space-between">
          <Col span={8}>
            <Card bordered={false}>
              <Title level={2}>4</Title>
              <Title level={5}>Interviews</Title>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Title level={2}>2</Title>
              <Title level={5}>Applications</Title>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Title level={2}>60</Title>
              <Title level={5}>Nines</Title>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashBoard;
