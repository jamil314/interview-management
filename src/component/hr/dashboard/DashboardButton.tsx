import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";

const { Title } = Typography;

type Props = {};

const DashboardButton: React.FC = (props: Props) => {
  const bgColor = "linear-gradient(230.04deg, #5B5B5B 2.11%, #232323 102.63%)";
  return (
    <Card bodyStyle={{ backgroundColor: bgColor }} bordered={false}>
      <Row gutter={12} align="middle" justify="center">
        <Col span={22}>
          <Title>Add a new Post</Title>
        </Col>
        <Col span={2}>
          <Button>+</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default DashboardButton;
