import React, { useState } from 'react';
import axios from 'axios';

const Register = (props) => {
    const [newUser, setNewUser] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post('http://localhost:4000/api/auth/register', newUser)
            .then(res => {
                console.log('Register success', res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                type="text"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                />
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register;