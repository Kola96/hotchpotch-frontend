import React from 'react';
import './ArticleApp.css';
import { ArticleCardList } from '../components/Article/ArticleList';
import { Header } from '../components/header';

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

export default App;