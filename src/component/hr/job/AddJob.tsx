import React, { useState, useEffect } from 'react';
import axios from 'axios';

import jobCard from './JobCard.module.scss'
import hr from '../hr.module.scss'

import { Card } from 'antd';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
} from 'antd';

const { RangePicker } = 
DatePicker;

interface posItem {
    id : string,
    position : string
}

interface SelectionOption {
    value : string,
    label : string
}



type FormData = {
    jobPositionId : String,
    minSalary : Number,
    maxSalary : Number,
    deadlines : {$d : String}[],
    deadline? : String,
    startDate? : String,
}

const submit = (Value : FormData) => {
    Value.startDate = Value.deadlines[0].$d;
    Value.deadline = Value.deadlines[1].$d;
    
    console.log(Value);

    console.log(`Bearer ${localStorage.getItem('token')}`);
    

    axios.post(`http://192.168.68.101:8080/job`, Value, {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            if(err) {
                console.log(err);
            }
        })
    
    
}

const AddJobCard : React.FC<Props> = ({jobCreationStatus}) => {

    // const [form] = Form.useForm();
    const [form] = Form.useForm();

    
    const [positions, setPositions] = useState<SelectionOption[]>([]);

    const getAllPositions = () => {
        axios.get(`http://192.168.68.101:8080/jobpositions`, {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}})
            .then(res => {
                console.log(res.data.data);
                let allpos : SelectionOption[] = [];
                const pos = res.data.data;
                pos.map( (item : posItem) => {
                    allpos.push({value : item.id, label : item.position})
                } )

                console.log(allpos);
                setPositions(allpos);


            })
            .catch(err => {
                if(err) {
                    console.log(err);
                    
                }
            })
        
    }
    
    useEffect(() => {
      getAllPositions();
    }, [])
    
    return (
        <Card
            actions={[
                <div key='discard' onClick={() => jobCreationStatus('Discard')}> Discard </div>,
                <div key='draft' onClick={() => jobCreationStatus('Draft')}> Save Draft </div>,
                <div key='confirm' onClick={() => {
                        form
                            .validateFields()
                            .then(values => {
                                form.resetFields();
                                console.log(values);
                                submit(values);
                                
                            }).catch(err => {
                                if(err) console.log(err);
                                
                            })
                            jobCreationStatus('Confirm')
                    }
                } > Confirm </div>,
            ]}
        >
        <Form
            labelCol={{ span: 6 }}
            form={form}
        >
            <Form.Item label="Position" name='jobsPositionId'>
                <Select
                    showSearch
                    placeholder="Select position"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={positions}
                />
            </Form.Item>
            
            <Form.Item label="Salary Range">
                <Form.Item
                    name="minSalary"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', margin: '0 8px' }}
                >
                    <InputNumber placeholder="Minimum" />
                </Form.Item>
                _
                <Form.Item
                    name="maxSalary"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', margin: '0 8px' }}
                >
                    <InputNumber placeholder="Maximum" />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Vacancy" name='vacancy'>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Deadline" name='deadlines'>
                <RangePicker />
            </Form.Item>
            
            {/* <Tabs
                defaultActiveKey="1"
                tabPosition='top'
                items={[
                    {
                        label: 'Description',
                        key: '1',
                        children: 
                            <Form.Item name='description'>
                                <TextArea rows={5} placeholder='lots of description'/>
                            </Form.Item>
                    },
                    {
                    label: 'Responsibilities',
                    key: '2',
                    children: 
                        <Form.List name="Responsibility">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, id) => (
                                        <div key={field.key} className={jobCard.listItem} >
                                            <Form.Item
                                                {...field}
                                                label={id + 1}
                                            >
                                                <Input style={{width : '450px'}}/>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </div>
                                    ))}

                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Responsibilities
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                },
                {
                    label: 'Requirements',
                    key: '3',
                    children: 
                        <Form.List name="Requirement">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, id) => (
                                        <div key={field.key} className={jobCard.listItem} >
                                            <Form.Item
                                                {...field}
                                                label={id + 1}
                                            >
                                                <Input style={{width : '450px'}}/>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </div>
                                    ))}

                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Requirement
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                },
                {
                    label: 'Benefits',
                    key: '4',
                    children: 
                        <Form.List name="benefits">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, id) => (
                                        <div key={field.key} className={jobCard.listItem} >
                                            <Form.Item
                                                {...field}
                                                label={id + 1}
                                            >
                                                <Input style={{width : '450px'}}/>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </div>
                                    ))}

                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add Benefit
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                },
                ]}
            /> */}


        </Form>
        </Card>
    )
}


type Props = {
    jobCreationStatus: (action : string) => void
}

const AddJob : React.FC<Props> = ({jobCreationStatus}) => {
    return (
        <div className={jobCard.pageFill} onClick={() => jobCreationStatus('Draft')} >
            <div className = {`${jobCard.add} ${hr.animation}`}  onClick={e => e.stopPropagation()}>
                {AddJobCard({jobCreationStatus})}
            </div>
        </div>
    )
}

export default AddJob;