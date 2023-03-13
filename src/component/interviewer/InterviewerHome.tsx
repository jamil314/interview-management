import React from "react";
import { LayoutFilled, ScheduleFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { interviewerData } from "Dummy/interviewerData";
import type { InterViewProps } from "Dummy/interviewTime";

const { Header, Content, Footer, Sider } = Layout;

const InterviewerHome: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems: MenuProps["items"] = [
    {
      key: "home",
      icon: <LayoutFilled />,
      label: "Home",
    },
    {
      key: "Schedule",
      icon: <ScheduleFilled />,
      label: "Schedule",
    },
  ];

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

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          className="logo"
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          style={{ height: 128, padding: 0, background: colorBgContainer }}
        >
          <div className="header-text-big" style={{}}>
            <h1>Hello {interviewerData.firstName} </h1>
          </div>
          <div className="header-text-small" style={{}}>
            <h2>{"Here's"} your schedule for today</h2>
          </div>
          <div className="profile-icon" style={{}}></div>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div className="stat-card" style={{}}>
            <h1>
              You have {interviewerData.interviews.length} upcoming interviews
            </h1>
            <h3>
              Next interview in
              {" " + getSoonestInterview(interviewerData.interviews)}
            </h3>
          </div>
          <div className="small-calender" style={{}}>
            <h1>Calender</h1>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default InterviewerHome;
