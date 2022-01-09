import { Header } from '../../components/Header';
import { SpiderJobList } from '../../components/spider-admin/SpiderJobList';

const SpiderAdminApp = () => {
    return (
        <>
            <Header />
            <SpiderJobList />
        </>
    );
};

export { SpiderAdminApp };