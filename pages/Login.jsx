import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';  

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const { username, password } = formData;
    const [error, setError] = useState('');

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            window.location.href = '/';  
        } catch (err) {
            setError('Error al iniciar sesión');
            console.error(err.response ? err.response.data : err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h3>Bienvenido!</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
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
                    <button type="submit" className="login-btn">Login</button>
                    {error && <p className="error-message">{error}</p>}  
                </form>
            </div>
        </div>
    );
};

export default Login;