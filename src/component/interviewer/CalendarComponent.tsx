import React from "react";
import { Badge, Calendar, Col, Layout, Row, theme } from "antd";
import type { Dayjs } from "dayjs";
import type { HeaderRender } from "antd/es/calendar/generateCalendar";
import { InterviewTimes, type InterViewProps } from "Dummy/interviewTime";
import moment from "moment";
import AvatarDropdown from "./AvatarDropdown";

const { Header, Content, Footer } = Layout;

const getDateData = (sentValue: Dayjs, interviewValues: InterViewProps[]) => {
  for (let i = 0; i < interviewValues.length; i++) {
    const interViewTime = interviewValues[i].dateTime;
    const sentValueDate = new Date(sentValue.toDate());

    const isSameTime = moment(sentValueDate).isSame(interViewTime, "day");
    const isBefore = moment(interViewTime).isBefore(new Date());

    if (isSameTime) {
      if (isBefore) {
        return {
          id: interviewValues[i].id,
          dateTime: interviewValues[i].dateTime,
          candidate: interviewValues[i].candidateName,
          complete: true,
        };
      }
      return {
        id: interviewValues[i].id,
        dateTime: interviewValues[i].dateTime,
        candidate: interviewValues[i].candidateName,
        complete: false,
      };
    }
  }
  return null;
};

const getMonthData = (sentValue: Dayjs, interviewValues: InterViewProps[]) => {
  let candates: string[] = [];
  for (let i = 0; i < interviewValues.length; i++) {
    const interViewTime = interviewValues[i].dateTime;

    const isBefore = moment(interViewTime).isBefore(new Date());
    if (isBefore) {
      continue;
    }

    const sentValueDate = new Date(sentValue.toDate());
    const isSameMonth = moment(sentValueDate).isSame(interViewTime, "month");

    if (isSameMonth) {
      candates.push(interviewValues[i].candidateName);
    }
  }
  return candates.length > 0 ? candates : null;
};

const CalendarComponent: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const monthCellRender = (value: Dayjs) => {
    const monthData = getMonthData(value, InterviewTimes);
    return monthData ? (
      <div className="notes-month">
        <h4>Interview this month with: </h4>
        <ul>
          {monthData.map((item) => {
            return (
              <li key={item}>
                <Badge color="gold" text={item} />
              </li>
            );
          })}
        </ul>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const dateData = getDateData(value, InterviewTimes);
    return dateData ? (
      <ul className="events">
        <li key={dateData.id}>
          <Badge color="geekblue" text={dateData.candidate} />
        </li>
        <li>
          <Badge
            color="volcano"
            text={
              dateData.dateTime.getHours() +
              ": " +
              dateData.dateTime.getMinutes()
            }
          />
        </li>
        {dateData.complete && (
          <li>
            <Badge color="green" text="Completed" />
          </li>
        )}
      </ul>
    ) : null;
  };

  const headerRender: HeaderRender<Dayjs> = ({
    value,
    type,
    onChange,
    onTypeChange,
  }) => {};

  return (
    <Layout className="calander-layout" style={{ marginLeft: 200 }}>
      <Header
        style={{
          height: 64,
          padding: 0,
          margin: "16px 8px 0",
          background: colorBgContainer,
          borderRadius: 12,
        }}
      >
        <Row align="middle">
          <Col span={22} offset={1}>
            <h2>Your Interview Calendar</h2>
          </Col>
          <Col span={2}>
            <AvatarDropdown />
          </Col>
        </Row>
      </Header>
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <Calendar
          headerRender={headerRender}
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
        />
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
};

export default CalendarComponent;
