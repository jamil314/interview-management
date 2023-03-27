import { Card, Typography, List, Row, Col, theme } from "antd";
import React from "react";
import {
  ExclamationCircleFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

type Props = {};
type dataType = {
  title: string;
  date: string;
  time: string;
  status: "Read" | "Unread";
};
const data: dataType[] = [
  {
    title: "Raisul Shehalk rescheduled the interview",
    date: "2023-4-10",
    time: "10:30 AM",
    status: "Read",
  },
  {
    title: "You have 6 new Applications",
    date: "2023-4-01",
    time: "11:00 AM",
    status: "Unread",
  },
  {
    title: "Hamil's interview is complete",
    date: "2023-3-29",
    time: "10:00 PM",
    status: "Read",
  },
  {
    title: "You have 9 pending interviews",
    date: "2023-3-30",
    time: "11:30 PM",
    status: "Unread",
  },
  {
    title: "Rahu Shinzou rescheduled the interview",
    date: "2023-4-05",
    time: "11:30 AM",
    status: "Unread",
  },
];

const NotificationBox = (props: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const checkToday = (date: string) => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();
    const todayDateStr = `${todayYear}-${todayMonth}-${todayDate}`;

    if (todayDateStr === date) {
      return true;
    }
    return false;
  };

  const splitMonthAndDate = (date: string) => {
    const dateArr = date.split("-");
    const month = dateArr[1];
    const day = dateArr[2];
    return `${day}/${+month < 10 ? "0" + month : month}`;
  };

  return (
    <List
      style={{ backgroundColor: colorBgContainer }}
      bordered
      size="large"
      header={<Title level={3}>Notifications</Title>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              item.status === "Unread" ? (
                <ExclamationCircleFilled />
              ) : (
                <CheckCircleOutlined />
              )
            }
            title={item.title}
            description={
              checkToday(item.date) ? item.time : splitMonthAndDate(item.date)
            }
          />
          {/* <Row>
            <Col span={2}>
              {item.status === "Unread" ? (
                <ExclamationCircleFilled />
              ) : (
                <CheckCircleOutlined />
              )}
            </Col>
            <Col span={18}>{item.title}</Col>
            <Col span={4}>
              {checkToday(item.date) ? item.time : splitMonthAndDate(item.date)}
            </Col>
          </Row> */}
        </List.Item>
      )}
    ></List>
  );
};

export default NotificationBox;
