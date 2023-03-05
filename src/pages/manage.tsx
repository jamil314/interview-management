import Dashboard from '@/component/hr/Dashboard';
import Footer from '@/component/margins/Footer'
import Header from '@/component/margins/Header'
import React, { useState } from 'react'
import margin from '../styles/margins.module.scss';

import Applications from '@/component/hr/Applications';
import Shortlist from '@/component/hr/Shortlist';


const manage : React.FC = () => {
  
  const contents = [<Applications/>, <Shortlist/>];

  const [Content, setContent] = useState<React.ReactNode> (contents[0]);
  const changeContent = (contentId : number) => {
    setContent(contents[contentId]);
  }

  return (
    <>
        <div className = {margin.hr} >
            <Dashboard changeContent = {changeContent}/>
            {Content}
        </div>
        <Header/>
        <Footer/>
    </>
  )
}

export default manage