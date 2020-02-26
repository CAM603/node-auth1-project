import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Navigation = (props) => {

    const logout = () => {
        axios.get('http://localhost:4000/api/auth/logout')
            .then(res => {
                console.log(res)
                localStorage.removeItem('id')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="navigation">
            <Link to="/">
                <p>Home</p>
            </Link>
            <Link to="/users">
                <p>Users</p>
            </Link>
            <Link to="/register">
                <p>Register</p>
            </Link>
            <Link to="/login">
                <p>Login</p>
            </Link>
            <Link to="/">
                <p onClick={logout}>Logout</p>
            </Link>
        </div>
    )
}

export default Navigation;