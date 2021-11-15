import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { ArticleApp } from './scene/ArticleApp';
import { LoginApp } from './scene/LoginApp';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ArticleApp />} />
            <Route path="/index" element={<ArticleApp />} />
            <Route path="/login" element={<LoginApp />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
