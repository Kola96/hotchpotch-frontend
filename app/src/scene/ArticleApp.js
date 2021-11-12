import React from 'react';
import { ArticleCardList } from '../components/ArticleList';
import { Header } from '../components/Header';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <ArticleCardList host={"http://16.162.46.216:8080"} size={18} />
            </div>
        );
    }
}

export { App };