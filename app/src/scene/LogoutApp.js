import axios from "axios";
import { Component } from "react";
import { useNavigate } from 'react-router-dom'

class LogoutApp extends Component {

    logout() {
        const url = `${window.config.baseUrl}/api/auth/logout`;
        axios.get(url).then(e => {
            this.props.navigate("/");
        });
    }

    componentDidMount() {
        this.logout();
    }

    render() {
        return "";
    }
}

const LogoutAppWithNavigate = () => {
    let navigate = useNavigate();
    return (
        <LogoutApp navigate={navigate} />
    )
}

export { LogoutAppWithNavigate as LogoutApp };