import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { App } from './scene/ArticleApp';
import { Demo } from './scene/Login';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/index" element={<App />} />
            <Route path="/login" element={<Demo />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
