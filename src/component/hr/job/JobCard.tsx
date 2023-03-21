import React
    ,{ useEffect, useState } 
    from 'react';
import axios from 'axios'
import jobCard from './JobCard.module.scss'
import hr from '../hr.module.scss'

import { Button, Card, RadioChangeEvent, Rate } from 'antd';

interface DataType {
        id: string | null;
        position: string;
        maxSalary: Number | String;
        minSalary: Number | String;
        vacancy: string;
        numOfApplicants: Number | String;
        deadline: string;
        createdAt? : string;
        isAvailable? : boolean;
}

interface PropType {
    record : DataType | null;
}

const SingleJobCard : React.FC<PropType> = ({record}) => {
    
    
    const [jobDescription, setJobDescription] = useState('Loading ...');
    const [jobResponsibilities, setJobResponsibilities] = useState(['loading...', 'loading...']);
    const [jobRequirements, setJobRequirements] = useState(['loading...', 'loading...']);
    
    const dummy = {
        position : 'Loading...',
        minSalary : 'Loading...',
        maxSalary : 'Loading...',
        vacancy : 'Loading...',
        numOfApplicants : 'Loading...',
        deadline : 'Loading...',
        id : null,
    }


    if(record == null) record = dummy; 
    const {position, minSalary, maxSalary, vacancy, numOfApplicants, deadline} = record;    
    
    const populate = () => {
        const id = record?.id;
        console.log(id);
        
        if(id === null) return;
        
        axios.get(`http://192.168.68.101:8080/jobsearch/${id}`,
        {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            const {description, requirement, responsibility} = res.data.data.position;
            console.count(description);
            console.log(requirement);
            console.log(responsibility);

            setJobDescription(description);
            setJobResponsibilities(responsibility);
            setJobRequirements(requirement);
            
        }).catch(err => {
            if(err) {
                console.log(err);
                return {d : 'loading.......'}
            }
        })

    }

    useEffect(() => {
        populate();
    }, [record])

    return (
        <Card
            actions={[
                // <div key='Edit' > 'Edit' </div>,
                // <div key='Delete' > 'Delete' </div>,
                // <div key='Hide' > 'Hide' </div>
            ]}
        >
            <div className={jobCard.posting}>
                <div className={jobCard.left}>
                    <p><b>Position :</b> {position}</p>
                    <p><b>Salary :</b> {`${minSalary} - ${maxSalary}`}</p>
                    <p><b>Vacancy :</b> {vacancy} </p>
                    <p><b>Applicants :</b> {`${numOfApplicants}`} </p>
                    <p><b>Deadline :</b> {deadline} </p>
                    <p><b>Job Description :</b> {jobDescription}</p>
                </div>

                <div className={jobCard.right}>
                    <p><b>Responsibilities : </b> 
                        {
                            jobResponsibilities.map((responsibility, key) => {
                                return (<p key={key}>
                                    {`${key + 1}) ${responsibility}`}
                                     </p> ) 
                        })       
                        }</p>
                    <p><b>Requirements : </b> 
                        {
                            jobRequirements.map((requirement, key) => {
                                return (<p key={key}>{`${key + 1}) ${requirement}`} </p> ) 
                            })       
                        }</p>
                
                </div>
            </div>
        </Card>
    )
}


type Props = {
    record : DataType | null;
    resetFocusJob : () => void
}

const JobCard : React.FC<Props> = ({record, resetFocusJob}) => {
    
    return (
        <div className={jobCard.pageFill} onClick={() => resetFocusJob()} >
            <div className = {` ${hr.animation}`}  onClick={e => e.stopPropagation()}>
                < SingleJobCard record = {record} />
            </div>
        </div>
    )
}

export default JobCard;