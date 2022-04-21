import { useLocation } from 'react-router';
import { ArticleCardList } from '../components/ArticleList.js';
import { MyHeader } from '../components/Header.js';
import { HotwordsCard } from '../components/HotwordsCard.js';
import qs from 'qs';

const ArticleApp = () => {
    const param = qs.parse(useLocation().search.slice(1));

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <MyHeader />
            <div style={{ display: 'flex', flex: 1, width: '100%' }}>
                <ArticleCardList size={20} tags={param.tags} />
                <HotwordsCard />
            </div>
        </div>
    );
}

export { ArticleApp };