import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ArticleCardList } from './articleList';
import { Header } from './header';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <ArticleCardList host={"http://localhost:8080"} size={18} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);