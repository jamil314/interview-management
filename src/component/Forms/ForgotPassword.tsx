import React, { useState } from 'react'
import axios from 'axios';
import { Button, Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import form from './Form.module.scss'

type Credential = {
    email : string;
    password : string;
}

const onFinish  = (credential : Credential) => {
    axios.post(`http://192.168.68.101:8080/account/login`, credential)
        .then(res => {
            const {token, roles} = res.data.data;
            
            console.log(token, roles);

            if(roles.includes('Interviewer')) window.location.href = '/interviewer'; 
            else window.location.href = '/manage'; 
            

            
        })
        .catch(err => {
            if(err) {
                console.log(err);
                
            }
        })
    
}

const LoginForm : React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);

  return (
    <Form
        className={form.form}
        name="forgot_password"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        title='Forgot Password'
    >   
        <Form.Item
            name="email"
            rules={[{
                    required: true,
                    message: 'Please input valid email!',
            }, ]}
        >
            <Input
                prefix={<UserOutlined />}
                type={showPassword ? "normal" : "password"}
                placeholder="Email"

            />
        </Form.Item>


        <Form.Item>
            <a className = {form.forgot} href="http://localhost:3000">
                Never mind
            </a>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className = {form.button}>
                Submit
            </Button>
        </Form.Item>

    </Form>
  )
}

export default LoginForm