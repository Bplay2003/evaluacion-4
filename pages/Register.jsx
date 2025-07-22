import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });

    const [error, setError] = useState('');  
    const { username, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(''); 
        if (password !== password2) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        const newUser = {
            username,
            email,
            password,
            password2,
            user_type: 'Client'  
        };

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/register/', newUser);
            console.log(res.data);

            window.location.href = 'http://localhost:3000/login';  
        } catch (err) {
            if (err.response && err.response.data) {
                if (err.response.data.username) {
                    setError('El nombre de usuario ya existe.');  
                } else {
                    setError('Hubo un error al registrar el usuario.');
                }
            } else {
                setError('Hubo un error al registrar el usuario.');
            }
            console.error(err.response ? err.response.data : err);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h3>Register</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="input-field"
                            id="username"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="input-field"
                            id="email"
                            placeholder="Email address"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            id="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Confirm Password</label>
                        <input
                            type="password"
                            className="input-field"
                            id="password2"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button type="submit" className="register-btn">Register</button>
                </form>
                {error && <p className="error-message">{error}</p>}  
            </div>
        </div>
    );
};

export default Register;