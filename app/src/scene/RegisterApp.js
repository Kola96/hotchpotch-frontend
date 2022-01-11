import { Row, Col, Divider } from 'antd';
import { RegisterForm } from '../components/RegisterForm';
import { MyHeader } from '../components/Header';

const RegisterApp = () => {
    return (
        <>
            <MyHeader hiddenUser />
            <Row justify="center" align="middle" style={{ minHeight: '85vh' }}>
                <Col span={4} style={{ minWidth: '300px' }}>
                    <Divider>注册</Divider>
                    <RegisterForm />
                </Col>
            </Row >
        </>
    );
}

export { RegisterApp };