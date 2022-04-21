import { useLocation } from 'react-router';
import { ArticleCardList } from '../components/ArticleList.js';
import { MyHeader } from '../components/Header.js';
import { TodayHotwordsCard } from '../components/HotwordsCard.js';
import qs from 'qs';

const ArticleApp = () => {
    const param = qs.parse(useLocation().search.slice(1));

    return (
        <div>
            <MyHeader />
            <div style={{ display: 'flex' }}>
                <ArticleCardList size={20} tags={param.tags} />
                <TodayHotwordsCard />
            </div>
        </div>
    );
}

export { ArticleApp };