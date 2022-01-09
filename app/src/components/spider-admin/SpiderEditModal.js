import { Input, Button, Modal, Form, message } from 'antd';
import React from 'react';
import axios from 'axios';
import toFormData from '../../utils/FormDataUtils';
import isEmpty from '../../utils/StrUtils';

class SpiderEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            id: props.spider.id,
            spiderName: props.spider.spiderName,
            cron: props.spider.cron
        };
        this.ref = React.createRef();
    }

    showModal = () => {
        this.setState({ isModalVisible: true });
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false });
    };

    onValueChange = (changeValue, allValues) => {
        this.setState({
            cron: allValues.cron
        });
    };

    handleOk = () => {
        var id = this.state.id;
        var spiderName = this.state.spiderName;
        var cron = this.state.cron;
        this.ref.current.validateFields();
        if (isEmpty(spiderName) || isEmpty(cron)) {
            message.error("请填写完整参数");
        } else {
            const url = `${window.config.baseUrl}/api/spider/updateSpiderJob`;
            axios.post(url, toFormData({ id: id, spiderName: spiderName, cron: cron })).then((res) => {
                if (res.data.code === 200) {
                    message.success("编辑成功");
                    this.setState({
                        isModalVisible: false,
                        cron: cron
                    });
                    this.props.parent.onChange();
                    this.ref.current.resetFields();
                } else {
                    message.error(res.data.msg);
                }
            });
        }
    };

    render() {
        return (
            <>
                <Button type="primary" style={this.props.style} onClick={this.showModal}>
                    编辑
                </Button>
                <Modal
                    title="编辑爬虫任务"
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
                        initialValues={{
                            id: this.state.id,
                            spiderName: this.state.spiderName,
                            cron: this.state.cron
                        }}
                    >
                        <Form.Item label="ID" name="id" >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item label="爬虫名" name="spiderName" >
                            <Input disabled />
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

export { SpiderEditModal };