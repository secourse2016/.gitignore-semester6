var express       = require('express');
var path          = require('path');
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var fs            = require('fs');
var app           = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// configuration ===============================================================
mongoose.connect(process.env.mongoURL); // connect to our database

/*
* Default route
*/
app.get("/",function(req,res){
  res.render("index.html");
});

/*
* Send the server route to a fake route to be handled by angular
*/
var sendIndex = function(req, res){
    return res.sendFile(__dirname + '/public/index.html');
};

app.route('/about').get(sendIndex);
app.route('/help').get(sendIndex);
app.route('/contact').get(sendIndex);
app.route('/termsAndConditions').get(sendIndex);
app.route('/privacypolicy').get(sendIndex);

app.route('/bookAFlight').get(sendIndex);
app.route('/offers').get(sendIndex);
app.route('/pricing').get(sendIndex);
app.route('/error').get(sendIndex);

/**
* App Routes go here
*/
app.route('/api/airports').get(function(req, res){
  res.json(JSON.parse(fs.readFileSync('./app/data/airports.json', 'UTF-8')));
});

app.use(function(req, res, next){
  res.status(404);
   res.send('404 Not Found');
});

module.exports = app;
