import React from 'react';
import axios from 'axios';
import { Button, Space, Table, Tag } from 'antd';

const { Column } = Table;

class SpiderJobList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageNum: props.pageNum,
            pageSize: props.pageSize,
            spiderName: props.spiderName,
            disable: props.disable,
            toBeEffective: props.toBeEffective
        }
        this.onChange = this.onChange.bind(this);
    }

    request(pageNum = this.state.pageNum, pageSize = this.state.pageSize, spiderName = this.state.spiderName, disable = this.state.disable, toBeEffective = this.state.toBeEffective) {
        const url = `${window.config.baseUrl}/api/spider/listSpiderJob?pageNum=${pageNum || ""}&pageSize=${pageSize || ""}&spiderName=${spiderName || ""}&disable=${disable || ""}&toBeEffective=${toBeEffective || ""}`;
        axios.get(url).then((res) => {
            var temp = res.data.data.list;
            for (let i = 0; i < temp.length; i++) {
                const element = temp[i];
                if (element.disable) {
                    element.status = <Tag color="red">{"已禁用"}</Tag>
                    element.actions = <Space size="middle" >
                        <Button size="middle" type="primary" >编辑</Button>
                        <Button size="middle" >启用</Button>
                    </Space>
                } else {
                    element.actions = <Space size="middle" >
                        <Button size="middle" type="primary" >编辑</Button>
                        <Button size="middle" type="primary" danger >禁用</Button>
                    </Space>
                    if (element.toBeEffective) {
                        element.status = <Tag color="yellow">{"待生效"}</Tag>
                    } else {
                        element.status = <Tag color="blue">{"运行中"}</Tag>
                    }
                }
            }
            this.setState({ totalNum: res.data.data.totalNum });
            this.setState({ currentPage: res.data.data.currentPage });
            this.setState({ data: res.data.data.list });
        })
    }

    onChange(pageNum) {
        this.request(pageNum, this.state.pageSize, this.state.spiderName, this.state.disable, this.state.toBeEffective);
    }

    componentDidMount() {
        this.request();
    }

    render() {
        return (
            <Table
                dataSource={this.state.data}
                rowKey={columns => columns.id}
                pagination={{
                    current: this.state.currentPage,
                    total: this.state.totalNum,
                    pageSize: this.props.pageSize,
                    onChange: this.onChange
                }}>
                <Column title="ID" dataIndex="id" />
                <Column title="爬虫名" dataIndex="spiderName" />
                <Column title="cron" dataIndex="cron" />
                <Column title="状态" dataIndex="status" />
                <Column title="创建时间" dataIndex="createTime" />
                <Column title="更新时间" dataIndex="updateTime" />
                <Column title="操作" dataIndex="actions" />
            </Table>
        )
    }
}

export { SpiderJobList }