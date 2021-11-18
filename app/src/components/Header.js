import axios from 'axios';
import { Component } from 'react';
import { Avatar, Button, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './css/Header.css';

const UserInfoContainer = (props) => {
    return (
        <>
            <Dropdown overlay={userMenu} placement="bottomCenter">
                <Avatar style={{ cursor: 'pointer' }} src={props.avatar} size='large' icon={<UserOutlined />} />
            </Dropdown>
            <span style={{ margin: '0 24px 0 15px' }}>{props.nickname}</span>
        </>
    );
}

const userMenu = (
    <Menu>
        <Menu.Item key="1" disabled>
            <a href="/user">
                个人中心
            </a>
        </Menu.Item>
        <Menu.Item key="2">
            <a href="/logout">
                退出登录
            </a>
        </Menu.Item>
    </Menu>
)

const LoginBotton = () => {
    return (
        <>
            <a href="/login">
                <Button type="primary">登录</Button>
            </a>
            <a href="/register">
                <Button style={{ margin: '0 15px 0 15px' }} >注册</Button>
            </a>
        </>
    )
}
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            nickname: null,
            avatar: null
        };
    }

    request = () => {
        const url = `${window.config.baseUrl}/api/auth/getUserInfo`
        axios.get(url, { withCredentials: true }).then(e => {
            if (e.data.code === 200) {
                this.setState({ isLogin: true });
                this.setState({ nickname: e.data.data.nickname });
            } else {
                this.setState({ isLogin: false });
            }

        });
    }

    componentDidMount = () => {
        this.request();
        console.log(this.props.hiddenUser);
    };

    render() {
        return (
            <div className="header">
                <div className="logo-container">
                    <a href="/">
                        <img src="logo.png" alt="logo" style={{ width: '48px', paddingRight: '10px' }} />
                    </a>
                    <span style={{ fontSize: '1.8em', fontWeight: '500', textDecoration: 'none' }}>今天看什么</span>
                </div>
                <div className="user-container" style={{ display: this.props.hiddenUser ? 'none' : 1 }}>
                    {this.state.isLogin ? <UserInfoContainer avatar={this.state.avatar} nickname={this.state.nickname} /> : <LoginBotton />}
                </div>
            </div>
        );
    }
}

export { Header };