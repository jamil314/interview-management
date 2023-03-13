import React from "react";
import { LayoutFilled, ScheduleFilled, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Dropdown, Avatar, Card } from "antd";
import { interviewerData } from "Dummy/interviewerData";
import type { InterViewProps } from "Dummy/interviewTime";

const { Header, Content, Footer, Sider } = Layout;

const InterviewerHome: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const siderMenuItems: MenuProps["items"] = [
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

  const avatarMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
          {" "}
          Profile
        </a>
      ),
    },
    {
      key: "logout",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
          {" "}
          Logout
        </a>
      ),
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
          items={siderMenuItems}
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
          <div className="profile-icon" style={{}}>
            <Dropdown menu={{ items: avatarMenuItems }}>
              <a onClick={(e) => e.preventDefault()}>
                <Avatar size={40}>{interviewerData.firstName}</Avatar>
                <DownOutlined />
              </a>
            </Dropdown>
          </div>
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
          <div className="small-calender" style={{}}>
            <h1>Calender</h1>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default InterviewerHome;
