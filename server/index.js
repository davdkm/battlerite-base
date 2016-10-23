// Importing Node modules and initializing Express
const express = require('express'),
    app = express(),
    logger = require('morgan'),
    config = require('./config/main');

// Start the server
const server = app.listen(config.port);
console.log('Battlerite Base server is running on port ' + config.port + '.');
