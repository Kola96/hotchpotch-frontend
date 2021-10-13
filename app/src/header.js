import React from 'react';
import './index.css'

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <img src="logo.png" alt="logo" style={{ width: "48px", paddingRight: "10px" }} />
                    <span style={{ fontSize: "2em", fontWeight: "bold" }}>HotchPotch</span>
                </div>
            </div>
        )
    }
}

export { Header };