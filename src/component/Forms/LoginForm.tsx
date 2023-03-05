import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import form from './Form.module.scss'
import React from 'react'

const onFinish = () => {
    window.location.href = './manage';
}

const LoginForm : React.FC = () => {

  return (
    <Form
        className={form.form}
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
    >
        <Form.Item
            name="username"
            rules={[{
                    required: true,
                    message: 'Please input your Username!',
                }, ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item
            name="password"
            rules={[{
                    required: true,
                    message: 'Please input your Password!',
            }, ]}
        >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
            />
        </Form.Item>

        <Form.Item>
            <a className = {form.forgot} href="">
            Forgot password
            </a>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className = {form.button}>
                Log in
            </Button>
        </Form.Item>

    </Form>
  )
}

export default LoginForm