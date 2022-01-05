import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArticleApp } from './scene/ArticleApp';
import { LoginApp } from './scene/LoginApp';
import { LogoutApp } from './scene/LogoutApp';
import { RegisterApp } from './scene/RegisterApp';
import { SpiderAdminApp } from './scene/SpiderAdmin/SpiderAdminApp';
import axios from 'axios';

axios.defaults.withCredentials = true;

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<ArticleApp />} />
            <Route exact path="/index" element={<ArticleApp />} />
            <Route exact path="/login" element={<LoginApp />} />
            <Route exact path="/register" element={<RegisterApp />} />
            <Route exact path="/logout" element={<LogoutApp />} />
            <Route exact path="/spiderAdmin" element={<SpiderAdminApp />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
