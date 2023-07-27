import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import RegistrationPage from './components/login/RegistrationPage';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import Footer from './components/footer/Footer';
import './custom.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(sessionStorage.getItem("UserName"));
    const Islogged = sessionStorage.getItem("UserName") == null ? false : true;
    console.log(Islogged);
    return (
        <div className="containerApp">
            {
                (!Islogged) ? (
                    <Routes>
                        <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/Login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/registration" element={<RegistrationPage />} />
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
