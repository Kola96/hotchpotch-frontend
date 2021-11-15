import { ArticleCardList } from '../components/ArticleList.js';
import { Header } from '../components/Header.js';

const ArticleApp = () => {
    return (
        <div>
            <Header />
            <ArticleCardList size={20} />
        </div>
    );
}

export { ArticleApp };