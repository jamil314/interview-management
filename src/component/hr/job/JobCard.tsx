import React, { useState } from 'react';
import jobCard from './JobCard.module.scss'
import hr from '../hr.module.scss'

import { Button, Card, RadioChangeEvent, Rate } from 'antd';

const card : React.FC<string> = (id) => {
    return (
        <Card
            actions={[
                'Edit',
                'Delete',
                'Hide'
            ]}
        >
            <div>
                <p><b>Position :</b> Senior Software Engineer</p>
                <p><b>Salary :</b> 100 k - 150 k</p>
                <p><b>Opening :</b> 3</p>
                <p><b>Applicants :</b> 7</p>
                <p><b>Deadline :</b> March 15, 2023</p>
                <p><b>Job Description :</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur eius beatae officia enim, voluptatem ipsum expedita alias laboriosam quos quam sunt unde incidunt vero laudantium corporis adipisci excepturi dolores ab?</p>
            </div>
        </Card>
    )
}


type Props = {
    resetFocusJob : () => void
}

const JobCard : React.FC<Props> = ({resetFocusJob}) => {
    return (
        <div className={jobCard.pageFill} onClick={() => resetFocusJob()} >
            <div className = {`${jobCard.main} ${hr.animation}`}  onClick={e => e.stopPropagation()}>
                {card('10')}
            </div>
        </div>
    )
}

export default JobCard;