const express = require('express');

const usersRouter = require('./users/users-router');

const server = express();

server.use(express.json());

server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send('<h1>Hello from Node auth1 Project</h1>')
});

module.exports = server;