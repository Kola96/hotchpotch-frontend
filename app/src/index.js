import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Header extends React.Component {
  render() {
    return (
      <div></div>
    )
  }
}

class ArticleContainer extends React.Component {
  render() {
    return (
      <div className="article-container">
        <a href={this.props.articleUrl} target="_blank" rel="noreferrer">
          <img className="cover-img" src={this.props.img} alt={this.props.title}/>
          <div className="article-info">
            <span className="title">{this.props.title}</span>
          </div>
        </a>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title">
          HotchPotch
        </h1>
        <ArticleContainer img="http://img.chuapp.com//wp-content/Picture/2021-08-07/610e241129483.jpg" title="测试标题" articleUrl="https://www.chuapp.com/article/288172.html"/>
      </div>
    );
  }
}
  
  // ========================================
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
