import React from "react";
import { Badge, Calendar } from "antd";
import type { BadgeProps } from "antd";
import type { Dayjs } from "dayjs";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import { InterviewTimes, type InterViewProps } from "Dummy/interviewTime";
import moment from "moment";
import "../../styles/calender.module.css";

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

const Calender: React.FC = () => {
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

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};

export default Calender;
