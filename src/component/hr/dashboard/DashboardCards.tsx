import { Card, Col, Row, Typography } from "antd";
import React from "react";

const { Title } = Typography;
type AntCardProps = { bigText: string; smallText: string };
type DashboardCardsProps = { props: AntCardProps[] };

const DashboardCards: React.FC<DashboardCardsProps> = ({ props }) => {
  const cardAmount = props.length;
  return (
    <Row gutter={12} justify="space-between">
      {props.map((prop) => {
        return (
          <Col key={prop.bigText} span={24 / cardAmount}>
            <Card bordered={false}>
              <Title level={2}>{prop.bigText}</Title>
              <Title level={5}>{prop.smallText}</Title>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default DashboardCards;
