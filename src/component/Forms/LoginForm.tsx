import React, { useState } from 'react'
import axios from 'axios';
import { Button, Form, Input, Tooltip } from 'antd'
import { LockOutlined, UserOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import form from './Form.module.scss'

type Credential = {
    email : string;
    password : string;
}

const onFinish  = (credential : Credential) => {
    console.log(credential);
    
    axios.post(`http://192.168.68.101:8080/account/login`, credential)
        .then(res => {
            console.log(res);

            const {token, roles} = res.data;

            

            localStorage.setItem('token', token);

            if(roles.includes('Interviewer')) window.location.href = '/interviewer'; 
            else if(roles.includes('HR')) window.location.href = '/manage'; 
            else window.location.href = '/jobs'; 
            
        })
        .catch(err => {
            if(err) {

                console.log(err);

                let status = err.response?.status;
                if(status == undefined) status = 500;

    
                console.log(status);

                switch (status) {
                    case 401:
                        alert(err.response.data.message)
                        break;
                    case 400:
                        alert("Bad Request")
                        break;
                    case 500:
                        alert('Server error')
                        break;
                    default:
                        alert('Unknown error')
                        break;
                }


                
            }
        })
    
}

const LoginForm : React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);

  return (
    <Form
        className={form.form}
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
    >
        <Form.Item
            name="email"
            rules={[{
                    required: true,
                    message: 'Please input your Username!',
                }, ]}
        >
            <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
            name="password"
            rules={[{
                    required: true,
                    message: 'Please input your Password!',
            }, ]}
        >
            <Input
                prefix={<LockOutlined />}
                type={showPassword ? "normal" : "password"}
                placeholder="Password"
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
            <a className = {form.forgot} href="http://localhost:3000/Forgot_password">
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