import React, { useState } from 'react';
import interviewer from './Interviewer.module.scss'
import hr from '../hr.module.scss'

import { Button, Card, RadioChangeEvent, Rate } from 'antd';

interface CardProps {
    name : string,
    position : string,
    schedule : string,
    record : string
}

const card: React.FC<CardProps> = ({name, position, schedule, record}) => {
    return (
        <Card
            actions={[
                'Set Up Interview'
            ]}
        >
            <div className={interviewer.card}>
                <img src='./person_round.png' className={interviewer.photo}/>
                <div className={interviewer.info}>
                    <p> Name : {name} </p>
                    <p> Position : {position} </p>
                    <p> Schedule : {schedule} </p>
                    <p> Interview Conducted : {record} </p>
                </div>
            </div>
        </Card>
    )
}



type Props = {
    resetFocusInterviewer : () => void
}

const InterviewerCard : React.FC<Props> = ({resetFocusInterviewer}) => {
    return (
        <div className={interviewer.pageFill} onClick={() => resetFocusInterviewer()} >
            <div className = {`${interviewer.main} ${hr.animation}`}  onClick={e => e.stopPropagation()}>
            {card({name : "Shakib Al Hasan", position : "All Rounder", schedule : "10pm - 6am", record : "120"})}
            </div>
        </div>
    )
}

export default InterviewerCard;