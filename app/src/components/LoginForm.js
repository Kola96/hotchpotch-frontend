import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Component } from 'react';
import axios from 'axios';
import { JSEncrypt } from 'jsencrypt'
import './css/LoginForm.css';


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            publicKey: "",
        }
    }

    onFinish = (user) => {
        const pkUrl = `${window.config.baseUrl}/api/auth/getPublicKey`;
        const loginUrl = `${window.config.baseUrl}/api/auth/login`;
        axios.get(pkUrl).then(e => {
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(e.data.data);
            user.password = encrypt.encrypt(user.password);
            console.log(user.password);
            axios.post(loginUrl, user).then(e => {
                console.log(e);
            });
        });
    }

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="account"
                    rules={[
                        {
                            required: true,
                            message: 'account',
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="用户名"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'password',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" style={{ display: 'none' }} href="/">
                        忘记密码
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <Button type="ghost" className="register-form-button">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};

export { LoginForm };