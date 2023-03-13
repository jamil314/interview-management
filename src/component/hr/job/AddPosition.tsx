import React, { useState } from 'react';
import jobCard from './JobCard.module.scss'
import hr from '../hr.module.scss'

import { AlertProps, Button, Card, RadioChangeEvent, Rate, Tabs } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const card : React.FC<Props> = ({positionCreationStatus}) => {
    return (
        <Card
            actions={[
                <div onClick={() => positionCreationStatus('Discard')}> Discard </div>,
                <div onClick={() => positionCreationStatus('Draft')}> Save Draft </div>,
                <div onClick={() => positionCreationStatus('Confirm')}> Confirm </div>,
            ]}
        >
        <Form
            labelCol={{ span: 8 }}
        >
            <Form.Item label="Position ">
                <Input
                    placeholder="Position"
                />
            </Form.Item>
            
            <Tabs
                defaultActiveKey="1"
                tabPosition='left'
                items={[
                {
                    label: 'Full Time',
                    key: '1',
                    children: <>
                                <Form.Item label="Salary Range">
                                    <Form.Item
                                        name="full-time-min"
                                        rules={[{ required: true }]}
                                        style={{ display: 'inline-block', margin: '0 8px' }}
                                    >
                                        <InputNumber placeholder="Minimum" />
                                    </Form.Item>
                                    _
                                    <Form.Item
                                        name="full-time-max"
                                        rules={[{ required: true }]}
                                        style={{ display: 'inline-block', margin: '0 8px' }}
                                    >
                                        <InputNumber placeholder="Maximum" />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="Description">
                                    <TextArea rows={5} placeholder="Job Description" />
                                </Form.Item>
                                </>,
                },
                {
                    label: 'Part Time',
                    key: '2',
                    children: <>
                                <Form.Item label="Salary Range">
                                    <Form.Item
                                        name="part-time-min"
                                        style={{ display: 'inline-block', margin: '0 8px' }}
                                    >
                                        <InputNumber placeholder="Minimum" />
                                    </Form.Item>
                                    _
                                    <Form.Item
                                        name="part-time-max"
                                        style={{ display: 'inline-block', margin: '0 8px' }}
                                    >
                                        <InputNumber placeholder="Maximum" />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="Description">
                                    <TextArea rows={5} placeholder="Job Description" />
                                </Form.Item>
                                </>,
                },
                {
                    label: 'Intern',
                    key: '3',
                    children: <>
                                <Form.Item label="Salary Range">
                                    <Form.Item
                                        name="intern-min"
                                        style={{ display: 'inline-block', margin: '0 8px' }}
                                    >
                                        <InputNumber placeholder="Minimum" />
                                    </Form.Item>
                                    _
                                    <Form.Item
                                        name="intern-max"
                                        style={{ display: 'inline-block', margin: '0 8px' }}
                                    >
                                        <InputNumber placeholder="Maximum" />
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="Description">
                                    <TextArea rows={5} placeholder="Job Description" />
                                </Form.Item>
                             </>,
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
                {card({positionCreationStatus})}
            </div>
        </div>
    )
}

export default AddPosition;