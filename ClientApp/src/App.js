import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import RegistrationPage from './components/login/RegistrationPage';
import AppRoutes from './AppRoutes';
import HomePage from './components/Home/HomePage'
import { Layout } from './components/Layout';
import Footer from './components/footer/Footer';
import BlogPage from './components/blogs/BlogPage'
import PostForm from './components/blogs/PostForm'
import './custom.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    console.log(isLoggedIn);
    return (
        <div className="containerApp">
            {
                (!isLoggedIn) ? (
                    <Routes>
                        <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/registration" element={<RegistrationPage />} />
                        <Route path="/HomePage" element={<HomePage />} />
                    </Routes>
                )
                    :
                    (
                        <Layout>
                            <Routes>
                                {AppRoutes.map((route, index) => (
                                    <Route key={index} path={route.path} element={route.element} />
                                ))}
                            </Routes>
                        </Layout>
                    )
            }
            <Footer />
        </div>
    );
}

export default App;
