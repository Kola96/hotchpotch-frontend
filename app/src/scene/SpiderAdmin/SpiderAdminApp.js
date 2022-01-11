import { Menu, Row, Col } from 'antd';
import React from 'react';
import { MyHeader } from '../../components/Header';
import { SpiderJobList } from '../../components/spider-admin/SpiderJobList';
import { ScrapyJobList } from '../../components/spider-admin/ScrapyJobList';
import './SpiderAdminApp.css'

class SpiderAdminApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inner: <SpiderJobList />
        };
    }

    onChange(element) {
        this.setState({ inner: element });
    }

    render() {
        return (
            <>
                <MyHeader />
                <Row style={{ padding: "16px 0 0 0" }}>
                    <Col span={3}>
                        <Menu defaultSelectedKeys={["schedule"]} >
                            <Menu.ItemGroup title="爬虫">
                                <Menu.Item onClick={() => this.onChange(<SpiderJobList />)} key="schedule" >定时任务</Menu.Item>
                                <Menu.Item onClick={() => this.onChange(<ScrapyJobList />)} key="status" >运行状况</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu>
                    </Col>
                    <Col span={21}>
                        {this.state.inner}
                    </Col>
                </Row>
            </>
        );
    }
};

export { SpiderAdminApp };