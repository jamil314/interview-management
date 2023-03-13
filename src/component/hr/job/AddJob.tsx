import React, { useState } from 'react';
import jobCard from './JobCard.module.scss'
import hr from '../hr.module.scss'

import { AlertProps, Button, Card, RadioChangeEvent, Rate } from 'antd';
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

const card : React.FC<Props> = ({jobCreationStatus}) => {
    return (
        <Card
            actions={[
                <div onClick={() => jobCreationStatus('Discard')}> Discard </div>,
                <div onClick={() => jobCreationStatus('Draft')}> Save Draft </div>,
                <div onClick={() => jobCreationStatus('Confirm')}> Confirm </div>,
            ]}
        >
        <Form
            labelCol={{ span: 8 }}
        >
            <Form.Item label="Position ">
                <Select
                    showSearch
                    placeholder="Select position"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        {
                            value: 'ceo',
                            label: 'CEO',
                        },
                        {
                            value: 'cto',
                            label: 'CTO',
                        },
                        {
                            value: 'software engineer',
                            label: 'Software Engineer',
                        },
                        {
                            value: 'junior software engineer',
                            label: 'Junior Software Engineer',
                        },
                        {
                            value: 'assistant software engineer',
                            label: 'Assistant Software Engineer',
                        },
                        {
                            value: 'assosiate software engineer',
                            label: 'Assosiate Software Engineer',
                        },
                        {
                            value: 'software quality assurance',
                            label: 'Software Quality Assurance',
                        },
                        {
                            value: 'database engineer',
                            label: 'Database Engineer',
                        },
                        {
                            value: 'business analyst',
                            label: 'Business Analyst',
                        },
                    ]}
                />
            </Form.Item>
            
            <Form.Item label="Job responsibility">
                <Radio.Group>
                    <Radio value="full time"> Full Time </Radio>
                    <Radio value="part time"> Part Time </Radio>
                    <Radio value="intern"> Intern </Radio>
                </Radio.Group>
            </Form.Item>
            
            <Form.Item label="Salary Range">
                <Form.Item
                    name="min"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', margin: '0 8px' }}
                >
                    <InputNumber placeholder="Minimum" />
                </Form.Item>
                _
                <Form.Item
                    name="max"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', margin: '0 8px' }}
                >
                    <InputNumber placeholder="Maximum" />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Opoen Positions">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Deadline">
                <RangePicker />
            </Form.Item>
            <Form.Item label="Description">
                <TextArea rows={5} />
            </Form.Item>


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
                {card({jobCreationStatus})}
            </div>
        </div>
    )
}

export default AddJob;