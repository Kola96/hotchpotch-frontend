import React from 'react';
import { ArticleCardList } from '../components/ArticleList.js';
import { Header } from '../components/Header.js';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <ArticleCardList host={"http://16.162.131.106:8080"} size={20} />
            </div>
        );
    }
}

export { App };