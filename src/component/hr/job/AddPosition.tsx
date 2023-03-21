import React from 'react';
import axios from 'axios';
import jobCard from './JobCard.module.scss'
import hr from '../hr.module.scss'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Tabs } from 'antd';
import {
  Form,
  Input,
  Button
} from 'antd';

const { TextArea } = Input;

type FormData = {
    position : String,
    description : String,
    Responsibility : String[],
    Requirement : String[],
    benefits : String[],
}


const submit = (values : FormData) => {
    console.log(values);
    console.log(localStorage.getItem('token'));
    
    axios.post(`http://192.168.68.101:8080/position`, values, {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            if(err) {
                console.log(err);
            }
        })
    

}

const AddPositionCard : React.FC<Props> = ({positionCreationStatus}) => {
    const [form] = Form.useForm();
    return (
        <Card
        actions={[
                <div key='discard' onClick={() => positionCreationStatus('Discard')}> Discard </div>,
                <div key='draft' onClick={() => positionCreationStatus('Draft')}> Save Draft </div>,
                <div key='confirm' onClick={() => {
                        form
                            .validateFields()
                            .then(values => {
                                form.resetFields();
                                console.log(values);
                                submit(values);
                                
                            })
                        positionCreationStatus('Confirm')
                    }
                } > Confirm </div>,
            ]}
        >
        <Form
            form={form}
        >
            <Form.Item label="Position " name="position">
                <Input
                    placeholder="Position"
                />
            </Form.Item>
            
            <Tabs
                defaultActiveKey="1"
                tabPosition='top'
                items={[
                    {
                        label: 'Description',
                        key: '1',
                        children: 
                            <Form.Item name='description'>
                                <TextArea rows={5} />
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
            />
        </Form>
        </Card>
    )
}


type Props = {
    positionCreationStatus: (action : string) => void
}

const AddPosition : React.FC<Props> = ({positionCreationStatus}) => {
    return (
        <div className={jobCard.pageFill} onClick={() => positionCreationStatus('Draft')} >
            <div className = {`${jobCard.add} ${hr.animation}`}  onClick={e => e.stopPropagation()}>
                {AddPositionCard({positionCreationStatus})}
            </div>
        </div>
    )
}

export default AddPosition;

