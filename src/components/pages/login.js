import React from "react";
import axios from 'axios';
import cookie from "react-cookies";
import { Navigate } from 'react-router-dom'

import {Button, Form, Input} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

class Login extends React.Component {
    state = {
        username:'',
        password:'',
        isLogin: false
    }

    componentDidMount() {
        if (cookie.load("token")) {
            this.setState({isLogin: true});
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        const user = {
            username: this.state.username,
            password: this.state.password
          };
    
          axios.post(`/api/login`, user)
            .then(res => {
                console.log(res);
                console.log(res.data)
                if(res.status === 200) {
                    this.setState({isLogin: true});
                    let cookieTime = new Date(res.data.timestamp + 2 * 3600 * 1000); 
                    console.log(cookieTime);
                    cookie.save("token", res.data.data.token, {expires: cookieTime});
                    console.log(this.state.isLogin, cookie.load("token"));
                }
              
            })
    };

    render() {
        if (this.state.isLogin === true) {
            return <Navigate to="/billList" />
        }
        return (
        <div className="login">
            <div className="login-form">
                <div className="login-logo">
                    <span>DAILY COST</span>
                </div>

                <Form 
                    onFinish={this.handleSubmit} 
                    style={{ maxWidth: '300px' }}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input
                            name="username"
                            prefix={<UserOutlined size={13} />}
                            placeholder="用户名"
                            onChange={this.handleChange}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password
                            name="password"
                            type="password"
                            prefix={<LockOutlined size={13} />}
                            placeholder="密码"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={this.handleChange}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                        登录
                        </Button>
                    </Form.Item>
                </Form>
            
            </div>
        </div>
    )
        }

}

export default Login;