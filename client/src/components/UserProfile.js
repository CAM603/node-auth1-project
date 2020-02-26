import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
axios.defaults.withCredentials = true;

const UserProfile = (props) => {
    const [profile, setProfile] = useState([]);
    const {id} = useParams();
    console.log(id)
    useEffect(() => {
        axios.get(`http://localhost:4000/api/users/${id}/profile`)
            .then(res => {
                console.log(res)
                setProfile(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h1>Name: {profile.name}</h1>
            <h2>Favorite food: {profile.favorite_food}</h2>
            <h3>Quote: {profile.quote}</h3>
        </div>
    )
}

export default UserProfile;