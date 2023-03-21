import AvatarDropdown from "@/component/interviewer/AvatarDropdown";
import { Col, Row } from "antd";
import React from "react";

type TopProps = { bigText: string; smallText: string };

const DashboardTopbar: React.FC<TopProps> = ({ bigText, smallText }) => {
  return (
    <Row align="middle" justify="center">
      <Col span={22}>
        <Row>
          <Col offset={1}>
            <h2>{bigText}</h2>
          </Col>
        </Row>
        <Row>
          <Col offset={1}>
            <h4>{smallText}</h4>
          </Col>
        </Row>
      </Col>
      <Col span={2}>
        <AvatarDropdown />
      </Col>
    </Row>
  );
};

export default DashboardTopbar;
