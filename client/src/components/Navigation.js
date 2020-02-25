import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
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
        </div>
    )
}

export default Navigation;