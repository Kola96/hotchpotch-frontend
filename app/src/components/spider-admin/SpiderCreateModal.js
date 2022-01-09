import React from 'react';
import { Modal, Button, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import toFormData from '../../utils/FormDataUtils';
import isEmpty from '../../utils/StrUtils';

const { Option } = Select;

class SpiderCreateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        };
        this.ref = React.createRef();
    }

    showModal = () => {
        this.setState({ isModalVisible: true });
    };

    handleOk = () => {
        var spiderName = this.state.spiderName;
        var cron = this.state.cron;
        this.ref.current.validateFields();
        if (isEmpty(spiderName) || isEmpty(cron)) {
            message.error("请填写完整参数");
        } else {
            const url = `${window.config.baseUrl}/api/spider/addSpiderJob`;
            axios.post(url, toFormData({ spiderName: spiderName, cron: cron })).then((res) => {
                if (res.data.code === 200) {
                    message.success("添加成功");
                    this.setState({
                        isModalVisible: false,
                        spiderName: null,
                        cron: null
                    });
                    this.props.parent.onChange();
                    this.ref.current.resetFields();
                } else {
                    message.error(res.data.msg);
                }
            });
        }
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false });
    };

    onValueChange = (changeValue, allValues) => {
        this.setState({
            spiderName: allValues.spiderName,
            cron: allValues.cron
        });
    };

    render() {
        return (
            <>
                <Button type="primary" style={this.props.style} onClick={this.showModal}>
                    新建爬虫任务
                </Button>
                <Modal
                    title="新建爬虫任务"
                    visible={this.state.isModalVisible}
                    okText="确认"
                    cancelText="取消"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form
                        name="spider"
                        labelCol={{
                            span: 6
                        }}
                        wrapperCol={{
                            span: 16
                        }}
                        ref={this.ref}
                        onValuesChange={this.onValueChange}
                    >
                        <Form.Item
                            label="爬虫名"
                            name="spiderName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入爬虫名',
                                },
                            ]}
                        >
                            <Select showSearch
                                placeholder="选择一个爬虫"
                                optionFilterProp="children"
                                onChange={(res) => { this.setState({ spiderName: res }) }}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                } >
                                {
                                    this.props.parent.state.spiderList.map(e =>
                                        <Option key={e} value={e}>{e}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="cron表达式"
                            name="cron"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入cron表达式',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export { SpiderCreateModal };