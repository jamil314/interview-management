import Menu from "@/component/hr/MenuComponent";
import Footer from "@/component/margins/Footer";
import Header from "@/component/margins/Header";
import React, { useState } from "react";
import margin from "../styles/margins.module.scss";

import Applications from "@/component/hr/Applications";
import Shortlist from "@/component/hr/Shortlist";
import JobPosts from "@/component/hr/job/JobPosts";
import HRDashBoard from "@/component/hr/dashboard/HRDashBoard";
import Interviewers from "@/component/hr/interviewer/Interviewers";

const manage: React.FC = () => {
  const contents = [
    <HRDashBoard />,
    <Applications />,
    <Shortlist />,
    <JobPosts />,
    <Interviewers />,
  ];

  const [Content, setContent] = useState<React.ReactNode>(contents[0]);
  const changeContent = (contentId: number) => {
    setContent(contents[contentId]);
  };

  return (
    <>
      <div className={margin.hr}>
        <Menu changeContent={changeContent} />
        {Content}
      </div>
      {/* <Header/>
        <Footer/> */}
    </>
  );
};

export default manage;
