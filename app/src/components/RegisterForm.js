import { Form, Input, Button, message } from 'antd';
import { Component } from 'react';
import axios from 'axios';
import { JSEncrypt } from 'jsencrypt'
import toFormData from '../utils/FormDataUtils';
import { useNavigate } from 'react-router-dom'

class RegisterFrom extends Component {

    redirect = () => {
        this.props.navigate("/");
    }

    onFinish = (user) => {
        const pkUrl = `${window.config.baseUrl}/api/auth/getPublicKey`;
        const registerUrl = `${window.config.baseUrl}/api/auth/register`;
        axios.get(pkUrl).then(e => {
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(e.data.data);
            user.password = encrypt.encrypt(user.password);
            axios.post(registerUrl, toFormData(user)).then(e => {
                if (e.data.code === 200) {
                    this.redirect();
                } else {
                    message.error(e.data.msg);
                }
            });
        });
    }

    render() {
        return (
            <Form
                name="normal_register"
                className="register-form"
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
                            message: '请填写用户名',
                        },
                    ]}
                >
                    <Input
                        placeholder="用户名"
                    />
                </Form.Item>
                <Form.Item
                    name="nickname"
                    rules={[
                        {
                            required: true,
                            message: '请填写昵称',
                        },
                    ]}
                >
                    <Input
                        placeholder="昵称"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请填写密码',
                        },
                    ]}
                >
                    <Input
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item
                    name="repeatPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: '请确认密码',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('两次输入的密码不一致'));
                            },
                        }),
                    ]}
                >
                    <Input
                        type="password"
                        placeholder="确认密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Button style={{ width: '100%' }} htmlType="submit" type="primary" className="form-button">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};

const RegisterFormWithNavigate = () => {
    let navigate = useNavigate();
    return (
        <RegisterFrom navigate={navigate} />
    )
}

export { RegisterFormWithNavigate as RegisterForm };