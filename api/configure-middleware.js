const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const sessionConfig = {
    // Defaults to 'sid'. Change so hackers don't know what middleware we are using
    name: 'monkey', 
    // Secret that encrypts cookie (usually configured in .env)
    secret: 'I like pineapple on pizza', 
    cookie: {
        // How long cookie/session will be valid (30 seconds here)
        maxAge: 1000 * 30,
        // True in production!
        secure: false, 
        // Cookie can't be accessed through javascript 
        httpOnly: true, 
    },
    // Recreate a session even if there is no change
    resave: false, 
    // GDPR laws against setting cookies automatically. Will need permission from client to change to true
    saveUninitialized: true // true only for development 
}

module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
    server.use(session(sessionConfig))
};
