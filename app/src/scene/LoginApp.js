import { Row, Col, Divider } from 'antd';
import { LoginForm } from '../components/LoginForm';
import { MyHeader } from '../components/Header';

const LoginApp = () => {
    return (
        <>
            <MyHeader hiddenUser />
            <Row justify="center" align="middle" style={{ minHeight: '85vh' }}>
                <Col span={4} style={{ minWidth: '300px' }}>
                    <Divider>登录</Divider>
                    <LoginForm />
                </Col>
            </Row >
        </>
    );
}

export { LoginApp };