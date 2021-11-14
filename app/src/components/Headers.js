import React from 'react';
import './css/Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="logo-container">
                    <img src="logo.png" alt="logo" style={{ width: "48px", paddingRight: "10px" }} />
                    <span style={{ fontSize: "1.8em", fontWeight: "500" }}>今天看什么</span>
                </div>
            </div>
        )
    }
}

export { Header };