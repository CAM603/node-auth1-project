import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:4000/api/auth/login', credentials)
            .then(res => {
                console.log('Login success', res)
                localStorage.setItem('id', res.data.id)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                type="text"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;