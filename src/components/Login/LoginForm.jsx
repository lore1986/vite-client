import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const LoginForm = (props) => {
    const [username_in, setUsername] = useState('primoecodrone');
    const [password_in, setPassword] = useState('0291JJidao');

    const handleLogin = async () => {
        try {

            var USE = {
                username: username_in,
                password: password_in
            };

            const requestBuilder = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(USE),
            };

            var response = await fetch('https://fasito.net/service/Auth/login', requestBuilder);
            
            if (!response.ok) {
                console.log(response.statusText);
                console.log(response.body)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            const token = responseData.token;


            props.onLoginSuccess(token);

            //localStorage.setItem('token', token);


        } catch (error) {
            console.error('Login failed', error);
        }
        
    };

    return (
        <div>
            <label>Username:</label>
            <input type="text" value={username_in} onChange={(e) => setUsername(e.target.value)} />

            <label>Password:</label>
            <input type="password" value={password_in} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
};


LoginForm.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginForm;

