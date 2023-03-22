import { Divider } from "antd";
import React from "react";

type Props = {};

const InvisibleDivider = (props: Props) => {
  return <Divider style={{ borderColor: "rgba(0,0,0,0)" }} />;
};

export default InvisibleDivider;
