import { message, Table, Col, Button } from "antd";
import axios from "axios";
import React from "react";

const { Column } = Table;

class ScrapyJobList extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            pendingJobs: [],
            runningJobs: [],
            finishedJobs: []
        });
    }

    request() {
        axios.get(`${window.config.baseUrl}/api/scrapy/listJobs?project=default`).then((res) => {
            if (res.data.code === 200) {
                res.data.data.running.map(e => {
                    const href = `${window.config.baseUrl}/api/scrapy/getLog?project=default&spider=${e.spider}&jobId=${e.id}`;
                    e.actions = <Button type="primary" href={href}>日志</Button>;
                    return null;
                });

                res.data.data.finished.map(e => {
                    const href = `${window.config.baseUrl}/api/scrapy/getLog?project=default&spider=${e.spider}&jobId=${e.id}`;
                    e.actions = <Button type="primary" href={href}>日志</Button>;
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

    componentDidMount() {
        this.request();
    }

    render() {
        return (
            <div style={{ margin: "0 28px 0 16px" }}>
                <Col>
                    <Col>
                        <h4>即将运行</h4>
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
                        <h4>运行中</h4>
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
                        <h4>已完成</h4>
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
            </div>
        );
    }
}

export { ScrapyJobList };