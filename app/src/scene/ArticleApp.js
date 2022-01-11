import { ArticleCardList } from '../components/ArticleList.js';
import { MyHeader } from '../components/Header.js';

const ArticleApp = () => {
    return (
        <div>
            <MyHeader />
            <ArticleCardList size={20} />
        </div>
    );
}

export { ArticleApp };