/**
* Require express main app.
*/
var app = require('./app');

/**
* Require http.
*/
var http = require('http');

/**
* Create a server.
*/
var server = http.createServer(app);

/**
* Get port number from .env file.
*/
var port = process.env.PORT;
server.listen(port);
