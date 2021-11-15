import axios from 'axios';
import { Component } from 'react';
import './css/Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
        };
        console.log(this.state);
    }

    request = () => {
        const url = `${window.config.baseUrl}/api/auth/getUserInfo`
        axios.get(url).then(e => {
            e.data.code === 200 ? this.setState({ isLogin: true }) : this.setState({ isLogin: false });
            console.log(this.state)
        })
    }

    componentDidMount = () => {
        this.request();
    };

    render() {
        return (
            <div className="header">
                <div className="logo-container">
                    <img src="logo.png" alt="logo" style={{ width: '48px', paddingRight: '10px' }} />
                    <span style={{ fontSize: '1.8em', fontWeight: '500' }}>今天看什么</span>
                </div>
                <div className="user-container">
                    {this.state.isLogin ? '已登录' : '未登录'}
                </div>
            </div>
        )
    }
}

export { Header };