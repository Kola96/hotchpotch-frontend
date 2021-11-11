import React from 'react';
import axios from 'axios';
import { Pagination } from 'antd';
import './ArticleList.css';

class ArticleContainer extends React.Component {

    containerWithoutImg = () => {
        return (
            <div className="article-container">
                <a href={this.props.articleUrl} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} target="_blank" rel="noreferrer">
                    <div className="article-info" style={{ padding: '15px 10px 15px 10px' }}>
                        <div className="title">
                            <span>{this.props.title}</span>
                        </div>
                        <div className="desc">
                            <span>{this.props.description}</span>
                        </div>
                        <div className="detail" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '15px' }}>
                            <div className="left">
                                {this.props.source}
                            </div>
                            <div className="right">
                                {this.props.publishTime}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }

    containerWithImg = () => {
        return (
            <div className="article-container">
                <a href={this.props.articleUrl} target="_blank" rel="noreferrer">
                    <div className="cover">
                        <img className="cover-img" src={this.props.coverImgUrl} alt={this.props.title} />
                        <div className="source">
                            <div className="left">
                                <span>{this.props.source}</span>
                            </div>
                            <div className="right">
                                <span>{this.props.publishTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className="article-info">
                        <div className="title">
                            <span>{this.props.title}</span>
                        </div>
                        <div className="desc">
                            <span>{this.props.description}</span>
                        </div>
                    </div>
                </a>
            </div>
        )
    }

    render() {
        if (this.props.coverImgUrl !== "") {
            return (<this.containerWithImg />)
        } else {
            return (<this.containerWithoutImg />)
        }
    }
}

class ArticleCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1,
            totalPage: 0
        }
    }

    request(page, keyword, source) {
        const url = `${this.props.host}/api/article?page=${page || ""}&size=${this.props.size || ""}&source=${source || ""}&tags=${keyword || ""}&title=${keyword || ""}`;
        axios.get(url)
            .then((res) => {
                this.setState({ data: res.data.data.articles });
                this.setState({ totalPage: res.data.data.totalPage });
            })
    }

    gotoPage = page => {
        console.log("111");
        this.request(page = page + 1);
    }

    componentDidMount() {
        this.request(this.state.page);
    }

    render() {
        return (
            <div className="main-body">
                <div className="container-list">
                    {this.state.data.map(e => <ArticleContainer key={e.id} {...e}></ArticleContainer>)}
                </div>
                <div className="pagination">
                    <Pagination
                        defaultCurrent={1}
                        current={this.state.page}
                        totalPage={this.state.totalPage}
                        onChange={this.gotoPage}
                    />
                </div>
            </div>
        )
    }
}

export { ArticleCardList };