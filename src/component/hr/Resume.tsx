import React, {useState} from 'react'
import { Button, Tooltip } from 'antd';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { ToolbarSlot, toolbarPlugin } from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

import resume from "./Resume.module.scss";

import {CloseOutlined} from '@ant-design/icons';


interface props {
    closeResume: () => void;
    resumeId: string | null;
    initialScreening: (action : string) => void
}

const Resume: React.FC<props> = ({closeResume, resumeId, initialScreening}) => {
  
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  const [defaultScale, setDefaultScale] = useState(1.5);

  // const handleDocumentLoadSuccess = ({ numPages, getPageWidth } : any) => {
  //   getPageWidth(1).then((width : number) => {
  //     const containerWidth = document.querySelector('.pdf-viewer')?.clientWidth; 
  //     const scale = containerWidth / width;
  //     setDefaultScale(scale); // Set default scale
  //   });
  // };

  

  const customToolbar = (props: ToolbarSlot) => {
    const {
        CurrentPageInput,
        Download,
        EnterFullScreen,
        GoToNextPage,
        GoToPreviousPage,
        NumberOfPages,
        Print,
        ZoomIn,
        Zoom,
        ZoomOut,
    } = props;
    return (
      <div className='pdfToolbar'>
        <div className={resume.toolBar}>
          <div className={resume.toolGroup}>
            <Tooltip title = 'Close Resume'>
              <Button onClick={closeResume} icon = {<CloseOutlined/> } ghost type='text' style={{color : 'white'}}/>
            </Tooltip>
            <EnterFullScreen />
          </div>

          <div className={resume.toolGroup}>
            <ZoomOut />
            <Zoom/>
            <ZoomIn />
          </div>

          <div className={resume.toolGroup}>
            <GoToPreviousPage />
            <CurrentPageInput />
            <div className={resume.NOPage}>
              / <NumberOfPages />
            </div>
            <GoToNextPage />
          </div>

          <div className={resume.toolGroup}>
            <Download />
            <Print />
            <Button type='primary' style={{marginRight:'10px'}} onClick={() =>initialScreening('accept')} >Process Further</Button>
            <Button type='primary' danger = {true}  onClick={() =>initialScreening('reject')} >Drop</Button>
          </div>
        </div>
      </div>
    );
}

  return (
    <>
        <div className={resume.pageFill} onClick={closeResume}>
            <div className={resume.container} onClick={e => e.stopPropagation()}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                  <Toolbar>{customToolbar}</Toolbar>

                    <Viewer 
                        
                        fileUrl = './resume1.pdf'
                        plugins = {[
                          toolbarPluginInstance
                        ]}
                        // className = 'resumePdf'
                        theme="dark"
                        defaultScale={defaultScale}
                        // zoom = {handleZoomChange} working here
                    />;

                </Worker>;
            </div>
        </div>
    </>
    
  )
}

export default Resume