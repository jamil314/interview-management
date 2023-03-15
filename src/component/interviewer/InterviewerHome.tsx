import { Calendar, Card, Col, Divider, Layout, Row, theme } from "antd";
import { interviewerData } from "Dummy/interviewerData";
import React from "react";
import { InterViewProps } from "Dummy/interviewTime";
import AvatarDropdown from "./AvatarDropdown";

const { Header, Content, Footer } = Layout;

const getSoonestInterview = (interviews: InterViewProps[]) => {
  const times = interviews.map((interview) => interview.dateTime);
  const now = new Date();
  const soonest = times.reduce((prev, curr) => {
    const prevDiff = Math.abs(now.getTime() - prev.getTime());
    const currDiff = Math.abs(now.getTime() - curr.getTime());
    return prevDiff < currDiff ? prev : curr;
  });
  if (soonest.getDate() === now.getDate()) {
    return soonest.toLocaleTimeString();
  }
  return soonest.toLocaleDateString();
};

const InterviewerHome = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="home-layout" style={{ marginLeft: 200 }}>
      <Header
        style={{
          height: 128,
          padding: 0,
          margin: "16px 8px 0",
          background: colorBgContainer,
          borderRadius: 12,
        }}
      >
        <Row align="middle">
          <Col span={22}>
            <Row>
              <Col offset={1}>
                <h2 className="header-text-big">
                  Hello {interviewerData.firstName}{" "}
                </h2>
              </Col>
            </Row>
            <Row>
              <Col offset={1}>
                <h4 className="header-text-small">
                  {"Here's"} your schedule for today
                </h4>
              </Col>
            </Row>
          </Col>
          <Col span={2}>
            <AvatarDropdown />
          </Col>
        </Row>
      </Header>
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <div className="stat-card" style={{}}>
          <Card
            title={
              "You have " +
              interviewerData.interviews.length +
              " upcoming interviews"
            }
            style={{}}
          >
            {" "}
            Next interview in
            {" " + getSoonestInterview(interviewerData.interviews)}
          </Card>
        </div>
        <Divider />
        <div
          className="small-calender"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Calendar style={{ width: 768 }} fullscreen={false} />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
};

export default InterviewerHome;
