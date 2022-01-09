import React from 'react';
import axios from 'axios';
import { Button, message, Space, Table, Tag, Row, Select, Divider } from 'antd';
import { SpiderCreateModal } from './SpiderCreateModal';
import toFormData from '../../utils/FormDataUtils';
import { SpiderEditModal } from './SpiderEditModal';

const { Column } = Table;
const { Option } = Select;

class SpiderJobList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            spiderList: [],
            pageNum: props.pageNum,
            pageSize: props.pageSize,
            spiderName: props.spiderName,
            disable: props.disable,
            toBeEffective: props.toBeEffective
        };
        this.onChange = this.onChange.bind(this);
        this.loadSpiderJob = this.loadSpiderJob.bind(this);
        this.runSpider = this.runSpider.bind(this);
    }

    stopSpiderJob(spiderJobId) {
        const url = `${window.config.baseUrl}/api/spider/stopSpiderJob`;
        axios.post(url, toFormData({ "spiderJobId": spiderJobId })).then((res) => {
            if (res.data.code === 200) {
                message.success("禁用成功");
                this.request(this.state.pageNum);
            } else {
                message.error(res.data.msg);
            }
        });
    }

    startSpiderJob(spiderJobId) {
        const url = `${window.config.baseUrl}/api/spider/startSpiderJob`;
        axios.post(url, toFormData({ "spiderJobId": spiderJobId })).then((res) => {
            if (res.data.code === 200) {
                message.success("启用成功");
                this.request(this.state.pageNum);
            } else {
                message.error(res.data.msg);
            }
        });
    }

    delSpiderJob(spiderJobId) {
        const url = `${window.config.baseUrl}/api/spider/delSpiderJob`;
        axios.post(url, toFormData({ "spiderJobId": spiderJobId })).then((res) => {
            if (res.data.code === 200) {
                message.success("删除成功");
                this.request(this.state.pageNum);
            } else {
                message.error(res.data.msg);
            }
        });
    }

    loadSpiderJob() {
        const url = `${window.config.baseUrl}/api/spider/loadSpiderJob`;
        axios.post(url).then((res) => {
            if (res.data.code === 200) {
                message.success("加载成功");
                this.request(this.state.pageNum);
            } else {
                message.error(res.data.msg);
            }
        });
    }

    runSpider() {
        const url = `${window.config.baseUrl}/api/scrapy/startSpider`;
        axios.post(url, toFormData({ project: "default", spider: this.state.runSpiderName })).then((res) => {
            if (res.data.code === 200) {
                message.success("启动成功");
            } else {
                message.error(res.data.msg);
            }
        });
    }

    request(pageNum, pageSize = this.state.pageSize, spiderName = this.state.spiderName, disable = this.state.disable, toBeEffective = this.state.toBeEffective) {
        const url = `${window.config.baseUrl}/api/spider/listSpiderJob?pageNum=${pageNum || ""}&pageSize=${pageSize || ""}&spiderName=${spiderName || ""}&disable=${disable || ""}&toBeEffective=${toBeEffective || ""}`;
        axios.get(url).then((res) => {
            if (res.data.code === 200) {
                var temp = res.data.data.list;
                for (let i = 0; i < temp.length; i++) {
                    const element = temp[i];
                    if (element.disable) {
                        element.actions = <Space size="middle" >
                            <SpiderEditModal parent={this} spider={element} />
                            <Button size="middle" onClick={() => this.startSpiderJob(element.id)} >启用</Button>
                            <Button size="middle" type="primary" danger onClick={() => this.delSpiderJob(element.id)} >删除</Button>
                        </Space>
                        if (element.toBeEffective) {
                            element.status = <Tag color="orange">待禁用</Tag>
                        } else {
                            element.status = <Tag color="red">已禁用</Tag>
                        }
                    } else {
                        element.actions = <Space size="middle" >
                            <SpiderEditModal parent={this} spider={element} />
                            <Button size="middle" type="primary" danger onClick={() => this.stopSpiderJob(element.id)} >禁用</Button>
                            <Button size="middle" type="primary" danger onClick={() => this.delSpiderJob(element.id)} >删除</Button>
                        </Space>
                        if (element.toBeEffective) {
                            element.status = <Tag color="orange">待生效</Tag>
                        } else {
                            element.status = <Tag color="blue">运行中</Tag>
                        }
                    }
                }
                this.setState({ totalNum: res.data.data.totalNum });
                this.setState({ pageNum: res.data.data.currentPage });
                this.setState({ data: res.data.data.list });
            }
        })
    }

    getSpiderList() {
        const url = `${window.config.baseUrl}/api/scrapy/listSpiders?project=default`;
        axios.get(url).then((res) => {
            if (res.data.code === 200) {
                this.setState({ spiderList: res.data.data });
            } else {
                this.setState({ spiderList: [] });
                message.error(res.data.msg);
            }
        });
    }

    onChange(pageNum = this.state.pageNum) {
        this.request(pageNum, this.state.pageSize, this.state.spiderName, this.state.disable, this.state.toBeEffective);
    }

    componentDidMount() {
        this.request();
        this.getSpiderList();
    }

    render() {
        return (
            <div style={{ margin: "16px" }}>
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
                        <SpiderCreateModal parent={this} />
                        <Button type="primary" onClick={this.loadSpiderJob} >加载爬虫任务</Button>
                    </Space>
                </Row>
                <Table
                    style={{ margin: "16px 0 0 0" }}
                    dataSource={this.state.data}
                    rowKey={columns => columns.id}
                    pagination={{
                        current: this.state.currentPage,
                        total: this.state.totalNum,
                        pageSize: this.props.pageSize,
                        onChange: this.onChange
                    }}>
                    <Column width="120px" title="ID" dataIndex="id" />
                    <Column title="爬虫名" dataIndex="spiderName" />
                    <Column title="cron" dataIndex="cron" />
                    <Column width="120px" title="状态" dataIndex="status" />
                    <Column width="200px" title="创建时间" dataIndex="createTime" />
                    <Column width="200px" title="更新时间" dataIndex="updateTime" />
                    <Column width="300px" title="操作" dataIndex="actions" />
                </Table>
            </div>
        );
    }
}

export { SpiderJobList };