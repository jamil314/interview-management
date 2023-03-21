import React, { useState } from 'react'
import axios from 'axios';
import { Button, Form, Input, Tooltip } from 'antd'
import { LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
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
        name="password_reset"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        title='Reset Password'
    >   
        <Form.Item
            name="password"
            rules={[{
                    required: true,
                    message: 'Please input new Password!',
            }, ]}
        >
            <Input
                prefix={<LockOutlined />}
                type={showPassword ? "normal" : "password"}
                placeholder="New Password"
                suffix={
                    <Tooltip title = {showPassword ? "Hide Password" : "Show Password"}>
                        {
                            showPassword?
                                <EyeOutlined onClick={() => setShowPassword(false)}/>
                               :<EyeInvisibleOutlined onClick={() => setShowPassword(true)}/>
                        }
                    </Tooltip>
                }

            />
        </Form.Item>

        <Form.Item
            name="confirm_password"
            rules={[
                {
                    
                    required: true,
                    message: 'Please input new Password Again',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }), 
            ]}
        >
            <Input
                prefix={<LockOutlined />}
                type={showPassword ? "normal" : "password"}
                placeholder="Confirm Password"
                suffix={
                    <Tooltip title = {showPassword ? "Hide Password" : "Show Password"}>
                        {
                            showPassword?
                                <EyeOutlined onClick={() => setShowPassword(false)}/>
                               :<EyeInvisibleOutlined onClick={() => setShowPassword(true)}/>
                        }
                    </Tooltip>
                }

            />
        </Form.Item>


        <Form.Item>
            <a className = {form.forgot} href="http://localhost:3000">
                Never mind
            </a>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className = {form.button}>
                Change Password
            </Button>
        </Form.Item>

    </Form>
  )
}

export default LoginForm