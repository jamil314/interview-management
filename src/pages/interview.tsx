import React, { useState } from "react";
import InterviewerMenu from "@/component/interviewer/InterviewerMenu";

type Props = {};

const interview: React.FC = () => {
  const contents = [<InterviewerMenu key="interviewer-menu" />];

  const [content, setContent] = useState<React.ReactNode>(contents[0]);

  return contents[0];
};

export default interview;
