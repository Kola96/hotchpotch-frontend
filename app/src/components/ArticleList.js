import React from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';

import { CoverImg } from './CoverImg';

const { Meta } = Card;

class ArticleCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: this.props.page ? this.props.page : 1,
            totalPage: 1,
            loading: true
        }
    }

    request(page, keyword, source) {
        const url = `${window.config.baseUrl}/api/article?page=${page || ""}&size=${this.props.size || ""}&source=${source || ""}&tags=${this.props.tags || ""}&title=${keyword || ""}`;
        axios.get(url).then((res) => {
            res.data.data.list.map(a => this.state.data.push(a));
            this.setState({ totalPage: res.data.data.totalPage });
            this.setState({ loading: false });
            this.setState({ currentPage: page });
            this.setState({ isLast: res.data.data.totalPage === res.data.data.currentPage });
        })
    }

    gotoNextPage = () => {
        this.setState({ loading: true });
        this.request(this.state.currentPage + 1);
    }

    componentDidMount() {
        this.request(this.state.currentPage);
    }

    render() {
        return (
            <div className="main-body" style={{ width: '85%' }}>
                <div className="container-list">
                    {
                        this.state.data.map(e =>
                            <a key={e.id} href={e.articleUrl} target="_blank" rel="noreferrer">
                                <Card
                                    cover={e.coverImgUrl ? <CoverImg
                                        alt={e.title}
                                        source={e.source}
                                        date={e.publishTime}
                                        width={'400px'}
                                        isVideo={e.mediaType === 1}
                                        style={{
                                            borderRadius: '2px 0 0 2px'
                                        }}
                                        src={e.coverImgUrl} /> : null}
                                    loading={this.state.loading}
                                    style={{ display: 'flex', margin: '24px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                                    hoverable>
                                    <Meta title={e.title} description={e.description} />
                                </Card>
                            </a>
                        )
                    }
                </div>
                <Button style={{ height: '60px' }} size='large' type='link' onClick={this.gotoNextPage} hidden={this.state.isLast} block>
                    加载更多
                </Button>
            </div>
        );
    }
}

export { ArticleCardList };