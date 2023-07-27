import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';
import { validateField } from '../validationUtils';
import { REGISTRATIONAPIURL } from '../../ConfigFile';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleRegistration = async () => {
        const nameError = validateField('name', name);
        const ageError = validateField('age', age);
        const genderError = validateField('gender', gender);
        const mobileError = validateField('mobile', mobile);
        const emailError = validateField('email', email);
        const passwordError = validateField('password', password);

        setErrors({
            name: nameError,
            age: ageError,
            gender: genderError,
            mobile: mobileError,
            email: emailError,
            password: passwordError
        });

        if (!nameError && !ageError && !genderError && !mobileError && !emailError && !passwordError) {
            try {
                const response = await fetch(REGISTRATIONAPIURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        age,
                        gender,
                        mobile,
                        email,
                        password
                    }),
                });

                if (response.ok) {
                    // Successful registration
                    navigate('/LoginPage');
                } else {
                    // Handle registration error
                    console.error('Registration failed');
                }
            } catch (error) {
                console.error('Registration error:', error);
            }
        }
    };

    return (
        <div className="container">
            <h2>Registration</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
            <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
            />
            {errors.age && <span className="error">{errors.age}</span>}
            <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Gender"
            />
            {errors.gender && <span className="error">{errors.gender}</span>}
            <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile"
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
            <button onClick={handleRegistration}>Register</button>
        </div>
    );
};

export default RegistrationPage;