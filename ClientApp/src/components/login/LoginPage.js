import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { LOGINAPIURL } from '../../ConfigFile';

const LoginPage = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = () => {
        setEmailError('');
        setPasswordError('');

        if (validateEmail(email) && password !== '') {
            const username = email
            // Make the API call for login
            fetch(LOGINAPIURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
                .then(response => response.json())
                .then(data => {
                    sessionStorage.setItem("MyToken", data.token);
                    sessionStorage.setItem("UserData", JSON.stringify(data.user));
                    sessionStorage.setItem("Userid", data.user.id);
                    sessionStorage.setItem("UserName", username);
                    setIsLoggedIn(true);
                    navigate('/Home');
                })
                .catch(error => {
                    console.error('Error:', error);
                    setPasswordError(error);
                    // Handle error if the API call fails
                });
        } else {
            if (!validateEmail(email)) {
                setEmailError('Please enter a valid email');
            } else {
                setPasswordError('Please enter a password');
            }
        }
    };

    const handleSignup = () => {
        // Handle signup logic
        navigate('/registration');
    };

    const validateEmail = email => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            {emailError && <p className="error">{emailError}</p>}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};


export default LoginPage;