import React, { useState } from 'react';
import { Button, RadioChangeEvent, Rate } from 'antd';
import { Radio, Timeline } from 'antd';
import status from './ApplicationStatus.module.scss'

const flipper : React.FC <number> = ( step ) => {
    return(
        <div className={status.flipCard} onClick={() => alert(step)}>
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

type Props = {
    resetFocus : () => void
}

const ApplicationStatus : React.FC<Props> = ({resetFocus}) => {

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
                                label: flipper(3),
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
        </div>
    )
}

export default ApplicationStatus