import {
    ReloadOutlined,
} from '@ant-design/icons';
import { message, Table, Col, Row, Button, Typography, Divider, Modal, Space, Select } from "antd";
import axios from "axios";
import React from "react";
import toFormData from '../../utils/FormDataUtils';

const { Column } = Table;
const { Title } = Typography;
const { Option } = Select;

class ScrapyJobList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            pendingJobs: [],
            runningJobs: [],
            finishedJobs: [],
            spiderList: [],
            isModalVisible: false,
            logText: null
        });
        this.runSpider = this.runSpider.bind(this);
    }

    request() {
        axios.get(`${window.config.baseUrl}/api/scrapy/listJobs?project=hcpcSpider`).then((res) => {
            if (res.data.code === 200) {
                res.data.data.running.map(e => {
                    const url = `${window.config.baseUrl}/api/scrapy/getLog?project=hcpcSpider&spider=${e.spider}&jobId=${e.id}`;
                    e.actions = <Button type="primary" onClick={() => { this.getLogText(url) }}>日志</Button>;
                    return null;
                });

                res.data.data.finished.map(e => {
                    const url = `${window.config.baseUrl}/api/scrapy/getLog?project=hcpcSpider&spider=${e.spider}&jobId=${e.id}`;
                    e.actions = <Button type="primary" onClick={() => { this.getLogText(url) }}>日志</Button>;
                    return null;
                });
                res.data.data.finished.reverse();
                this.setState({
                    pendingJobs: res.data.data.pending,
                    runningJobs: res.data.data.running,
                    finishedJobs: res.data.data.finished
                });
            } else {
                message.error("获取不到爬虫运行状况，请联系管理员");
            }
        });
    }

    showModal = () => {
        this.setState({ isModalVisible: true });
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false });
    };

    getLogText(url) {
        axios.get(url).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    logText: res.data.data,
                    isModalVisible: true
                });
            } else {
                message.error(res.data.msg);
            }
        });
    }

    getSpiderList() {
        const url = `${window.config.baseUrl}/api/scrapy/listSpiders?project=hcpcSpider`;
        axios.get(url).then((res) => {
            if (res.data.code === 200) {
                this.setState({ spiderList: res.data.data });
            } else {
                this.setState({ spiderList: [] });
                message.error(res.data.msg);
            }
        });
    }

    runSpider() {
        const url = `${window.config.baseUrl}/api/scrapy/startSpider`;
        axios.post(url, toFormData({ project: "hcpcSpider", spider: this.state.runSpiderName })).then((res) => {
            if (res.data.code === 200) {
                message.success("启动成功");
                this.request();
            } else {
                message.error(res.data.msg);
            }
        });
    }

    componentDidMount() {
        this.request();
        this.getSpiderList();
    }

    render() {
        return (
            <div style={{ margin: "0 28px 0 16px" }}>
                <Col>
                    <Row justify="end">
                        <Space size="middle">
                            <Select
                                style={{ width: "180px" }}
                                showSearch
                                placeholder="选择一个爬虫"
                                optionFilterProp="children"
                                onChange={(res) => { this.setState({ runSpiderName: res }) }}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {
                                    this.state.spiderList.map(e =>
                                        <Option key={e} value={e}>{e}</Option>
                                    )
                                }
                            </Select>
                            <Button type="primary" onClick={this.runSpider}>手动执行</Button>
                            <Divider type="vertical" />
                            <Button type="primary" onClick={() => this.request()} icon={<ReloadOutlined />} style={{ width: "60px" }} />
                        </Space>
                    </Row>
                    <Divider style={{ margin: "16px 0 8px 0" }} />
                    <Col>
                        <Title level={5}>即将运行</Title>
                        <Table
                            dataSource={this.state.pendingJobs}
                            rowKey={columns => columns.id}
                            size="small"
                            style={{ margin: "0 0 16px 0" }}
                        >
                            <Column title="ID" dataIndex="id" />
                            <Column title="爬虫名" dataIndex="spider" />
                        </Table>
                    </Col>
                    <Col>
                        <Title level={5}>运行中</Title>
                        <Table
                            dataSource={this.state.runningJobs}
                            rowKey={columns => columns.id}
                            size="small"
                            style={{ margin: "0 0 16px 0" }}
                        >
                            <Column title="ID" dataIndex="id" />
                            <Column title="爬虫名" dataIndex="spider" />
                            <Column title="开始时间" dataIndex="start_time" />
                            <Column title="操作" dataIndex="actions" />
                        </Table>
                    </Col>
                    <Col>
                        <Title level={5}>已完成</Title>
                        <Table
                            dataSource={this.state.finishedJobs}
                            rowKey={columns => columns.id}
                            size="small"
                            style={{ margin: "0 0 16px 0" }}
                        >
                            <Column title="ID" dataIndex="id" />
                            <Column title="爬虫名" dataIndex="spider" />
                            <Column title="开始时间" dataIndex="start_time" />
                            <Column title="结束时间" dataIndex="end_time" />
                            <Column title="操作" dataIndex="actions" />
                        </Table>
                    </Col>
                </Col>
                <Modal
                    title="日志"
                    width={"80%"}
                    visible={this.state.isModalVisible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <span style={{ whiteSpace: "pre-line" }}>{this.state.logText}</span>
                </Modal>
            </div>
        );
    }
}

export { ScrapyJobList };