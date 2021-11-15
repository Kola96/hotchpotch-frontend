import { Row, Col, Divider } from 'antd';
import { LoginForm } from '../components/LoginForm.js';

const LoginApp = () => {
    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={4} style={{ minWidth: '300px' }}>
                <Divider>登录</Divider>
                <LoginForm />
            </Col>
        </Row >
    );
}

export { LoginApp };