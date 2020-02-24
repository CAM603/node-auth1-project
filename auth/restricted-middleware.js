const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

module.exports = (req, res, next) => {
    let { username, password } = req.headers;

    if(username && password) {

    } else {
        res.status(400).json({ message: 'Please provide credentials' });
    }
}