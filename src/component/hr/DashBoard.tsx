import { Col, Layout, Row } from "antd";
import React from "react";
import hr from "../hr/hr.module.scss";

type Props = {};

const { Header, Content, Footer } = Layout;

const DashBoard = (props: Props) => {
  return (
    <Layout>
      <Header className={hr.header}>
        <Row>
          <Col flex="auto">
            <Row>Hello bayjed</Row>
            <Row> how u doin </Row>
          </Col>
          <Col flex="48px"> avatar</Col>
        </Row>
      </Header>
      <Content>
        <Row>
          <Col span={8}>2 interview</Col>
          <Col span={8}>3 application</Col>
          <Col span={8}>69 jobs</Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashBoard;
