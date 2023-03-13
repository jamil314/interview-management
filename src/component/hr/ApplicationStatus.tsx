import React, { useState } from 'react';
import { Button, Card, RadioChangeEvent, Rate } from 'antd';
import { Radio, Timeline } from 'antd';

import { EditOutlined,EllipsisOutlined,SettingOutlined } from '@ant-design/icons';

import status from './ApplicationStatus.module.scss'
interface flipperProp {
    step : number,
    assignInterviewer : () => void
}
const flipper : React.FC <flipperProp> = ( {step, assignInterviewer} ) => {
    return(
        <div className={status.flipCard} onClick={assignInterviewer}>
            <div className={status.flipInner}>
                <div className={status.flipFront}>
                    Pending
                </div>
                <div className={status.flipBack}>
                    Assign {step}th interviewer              
                </div>
            </div>
        </div>
    )
}

interface interviewrCardProps {
    name : string,
    position : string,
    schedule : string
}

const interviewerCard : React.FC<interviewrCardProps> = ({name, position, schedule}) => {
    return (
        <Card
            actions={[
                'Set Up Interview'
            ]}
        >
            <div className={status.interviewerCard}>
                <img src='./person_round.png' className={status.interviewerPhoto}/>
                <div className={status.interviewerInfo}>
                    <p> Name : {name} </p>
                    <p> Position : {position} </p>
                    <p> Schedule : {schedule} </p>
                </div>
            </div>
        </Card>
    )
}

type Props = {
    resetFocus : () => void
}

const ApplicationStatus : React.FC<Props> = ({resetFocus}) => {
    
    const [assign, setAssign] = useState(false);

    const assignInterviewer = () => {
        setAssign(true)
    }

    return (
        <div className={status.pageFill} onClick={() => resetFocus()} >
            <div className={status.info}>
                <div className={status.timeline} onClick={e => e.stopPropagation()}>
                    <Timeline
                        mode='left'
                        items={[
                            {
                                label: '2015-09-01',
                                children: 'Applied',
                            },
                            {
                                color: 'green',
                                label: '2015-09-01 09:12:11',
                                children: 'First Interview',
                            },
                            {
                                color: 'orange',
                                label: 'scheduled at 2015-09-01 09:12:11',
                                children: 'second interview',
                            },
                            {
                                color: 'gray',
                                // label: 'pending',
                                label: flipper({ step : 3 , assignInterviewer}),
                                children: 'third interview',
                            },
                        ]}
                        />
                </div>

                <div className={status.note} onClick={e => e.stopPropagation()}>
                    <p>Name : Hamilton Masakadza</p>
                    <p>Post : Full-Stack Cricketer</p>
                    <p>Batting : <Rate defaultValue={5.5} disabled allowHalf count={7}/> </p>
                    <p>Bowling : <Rate defaultValue={4.5} disabled allowHalf count={7}/> </p>
                    <p>Feilding : <Rate defaultValue={5} disabled allowHalf count={7}/> </p>
                    <p>Communication : <Rate defaultValue={6} disabled allowHalf count={7}/> </p>
                </div>
            </div>
            <Button shape='circle' className={`${status.closeInterviewrSelection} ${assign?status.showSetInterview : status.hideSetInterview}`} onClick={e => {e.stopPropagation(); setAssign(false)}}> X </Button>
            <div className={`${status.interviewers} ${assign?status.showSetInterview : status.hideSetInterview}`} onClick={e => e.stopPropagation()}>
                    {/* list of interviewers <br/> */}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
                    {interviewerCard({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am"})}
            </div>
        </div>
    )
}

export default ApplicationStatus