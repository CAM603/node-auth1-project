import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Users = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/users')
            .then(res => {
                setUsers(res.data.map(el => {
                    return {username: el.username, id: el.id}
                }))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <Link to={`users/${user.id}`}>
                        <h3>{user.username}</h3>
                    </Link>
                </div>
            )
            )}
        </div>
    )
}

export default Users;