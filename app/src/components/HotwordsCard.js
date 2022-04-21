import { Affix, Card, Space, Tag } from 'antd';
import React from 'react';
import axios from 'axios';

class HotwordsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oneHourHotwords: [],
            todayHotwords: []
        }
    }

    getOneHourWords() {
        const url = `${window.config.baseUrl}/api/article/oneHourHotWords`;
        axios.get(url).then((res) => {
            this.setState({ oneHourHotwords: res.data.data });
        })
    }

    getTodayWords() {
        const url = `${window.config.baseUrl}/api/article/todayHotWords`;
        axios.get(url).then((res) => {
            this.setState({ todayHotwords: res.data.data });
        })
    }

    componentDidMount() {
        this.getOneHourWords();
        this.getTodayWords();
    }

    render() {
        return (
            <div style={{ margin: '24px 24px 0 0' }} >
                <Affix offsetTop={12}>
                    <div>
                        <Card title='一小时热词' style={{ marginBottom: '24px' }}>
                            <Space wrap>
                                {
                                    this.state.oneHourHotwords.map((e, key) =>
                                        <a href={'?tags=' + e}>
                                            <Tag color={'blue'} key={key}>{e}</Tag>
                                        </a>
                                    )
                                }
                            </Space>
                        </Card>
                        <Card title='今日热词'>
                            <Space wrap>
                                {
                                    this.state.todayHotwords.map((e, key) =>
                                        <a href={'?tags=' + e}>
                                            <Tag color={'blue'} key={key}>{e}</Tag>
                                        </a>
                                    )
                                }
                            </Space>
                        </Card>
                    </div>
                </Affix>
            </div>
        )
    }
}

export { HotwordsCard };