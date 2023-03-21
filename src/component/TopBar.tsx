import React, { useRef, useState } from "react";
import { SearchOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Tooltip,
  notification,
  Space,
  InputRef,
  Input,
  Table,
  Empty,
} from "antd";

import topBar from "./TopBar.module.scss";

type Props = {
  notification: String;
};

const TopBar: React.FC<Props> = ({ notification }) => {
  const [searching, setSearching] = useState(false);
  const ref = useRef(null);

  return (
    <div className={topBar.topBar}>
      <div className={searching ? topBar.searchOn : topBar.searchOff}>
        <Input
          ref={ref}
          // autoFocus
          prefix={searching ? <SearchOutlined /> : <div />}
          className={topBar.searchArea}
          placeholder="Search anything"
          onPressEnter={(e) => alert(`Searched : ${e.target.value}`)}
          suffix={
            searching ? (
              <Tooltip title="Cancel Search">
                <Button
                  size="small"
                  type="primary"
                  shape="circle"
                  icon={<CloseOutlined />}
                  onClick={() => setSearching(false)}
                />
              </Tooltip>
            ) : (
              <div />
            )
          }
        />
        {searching ? null : (
          <Tooltip title="Search">
            <Button
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
              onClick={() => {
                setSearching(true);
                ref.current?.focus();
              }}
            />
          </Tooltip>
        )}
      </div>
      <div style={{ whiteSpace: "nowrap" }} className={topBar.scrollParent}>
        <a className={topBar.scrollElement}>{notification}</a>
        <a className={topBar.scrollElement} style={{ left: "100%" }}>
          {notification}
        </a>
      </div>
      <div>
        {" "}
        <Tooltip title="Visit Profile">
          <Button type="primary" shape="circle" icon={<UserOutlined />} />
        </Tooltip>{" "}
      </div>
    </div>
  );
};

export default TopBar;
