import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/home';
import Detail from '../pages/detail/detail';
import Header from '../components/Header';

const MainRouter: FC = () => {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/detail-product/:catalogId" element={<Detail />} />
                </Routes>
            </Router>
        </div>
    );
}

export default MainRouter;