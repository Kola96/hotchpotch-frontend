import { Row, Col, Divider } from 'antd';
import { RegisterForm } from '../components/RegisterForm';

const RegisterApp = () => {
    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={4} style={{ minWidth: '300px' }}>
                <Divider>注册</Divider>
                <RegisterForm />
            </Col>
        </Row >
    );
}

export { RegisterApp };