import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <img src="logo.png" alt="logo" style={{ width: "48px", paddingRight: "10px" }} />
          <span style={{ fontSize: "2em", fontWeight: "bold" }}>HotchPotch</span>
        </div>
      </div>
    )
  }
}

class ArticleContainer extends React.Component {
  render() {
    return (
      <div className="article-container">
        <a href={this.props.articleUrl} target="_blank" rel="noreferrer">
          <img className="cover" src={this.props.coverImgUrl} alt={this.props.title} />
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
}

class ContainerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.request();
  }

  request = () => {
    axios.get("http://localhost:8080/api/article")
      .then((res) => {
        this.setState({ data: res.data.data });
      })
  }

  render() {
    let data = this.state.data;
    return (
      <div className="container-list">
        {data.map(e => <ArticleContainer key={e.id} {...e}></ArticleContainer>)}
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ContainerList />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
