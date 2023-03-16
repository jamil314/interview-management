import { Avatar, Dropdown, MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { interviewerData } from "Dummy/interviewerData";
import React from "react";

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
const AvatarDropdown: React.FC = () => {
  return (
    <div>
      <div className="profile-icon" style={{}}>
        <Dropdown menu={{ items: avatarMenuItems }}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar size={40}>{interviewerData.firstName}</Avatar>
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default AvatarDropdown;
