const express = require('express');

const Users = require('./users-model');

const router = express.Router();

// Get all users
router.get('/', (req, res) => {
    Users.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get users' })
        })
})

// Get a user
router.get('/:id', (req, res) => {
    const {id} = req.params;

    Users.getById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'Failed to find user with given id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get user' })
        })
})

// Get a users profile
router.get('/:id/profile', (req, res) => {
    const {id} = req.params;
    Users.getById(id)
        .then(user => {
            if(user) {
                Users.getUserProfile(id)
                    .then(user => {
                        if(user) {
                            res.status(200).json(user)
                            console.log(req.session)
                        } else {
                            res.status(404).json({ message: 'User has no profile yet' })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.json(500).json({ message: 'Failed to get user profile' })
                    })
            } else {
                res.status(404).json({ message: 'Failed to find user with given id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get user' })
        })
})

// Add profile to a user
router.post('/:id/profile', (req, res) => {
    const {id} = req.params;
    req.body.user_id = id;

    Users.getById(id)
        .then(user => {
            if(user) {
                Users.getUserProfile(id)
                    .then(user => {
                        if(!user) {
                            Users.addProfile(id, req.body)
                                .then(profile => {
                                    res.status(201).json(profile)
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).json({ message: 'Failed to add profile' })
                                })
                        } else {
                            res.status(500).json({ message: 'User already has a profile' })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.json(500).json({ message: 'Failed to get user profile' })
                    })
            } else {
                res.status(404).json({ message: 'Failed to find user with given id' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to find user' })
        })
})

module.exports = router;