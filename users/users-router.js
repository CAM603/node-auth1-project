const express = require('express');

const Users = require('./users-model');

const router = express.Router();

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

module.exports = router;