import React, { useState } from 'react';
import interviewer from './Interviewer.module.scss'
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

const card : React.FC<Props> = ({interviewerCreationStatus}) => {
    return (
        <Card
            actions={[
                <div onClick={() => interviewerCreationStatus('Discard')}> Discard </div>,
                <div onClick={() => interviewerCreationStatus('Draft')}> Save Draft </div>,
                <div onClick={() => interviewerCreationStatus('Confirm')}> Confirm </div>,
            ]}
        >
        <Form
            labelCol={{ span: 6 }}
        >
    
            <Form.Item label="Name">
                <Input />
            </Form.Item>
            <Form.Item label="Email">
                <Input />
            </Form.Item>
            <Form.Item label="Phone">
                <Input />
            </Form.Item>
            <Form.Item label="Schedule">
                <Input />
            </Form.Item>


        </Form>
        </Card>
    )
}


type Props = {
    interviewerCreationStatus: (action : string) => void
}

const AddInterviewer : React.FC<Props> = ({interviewerCreationStatus}) => {
    return (
        <div className={interviewer.pageFill} onClick={() => interviewerCreationStatus('Draft')} >
            <div className = {`${interviewer.add} ${hr.animation}`}  onClick={e => e.stopPropagation()}>
                {card({interviewerCreationStatus})}
            </div>
        </div>
    )
}

export default AddInterviewer;