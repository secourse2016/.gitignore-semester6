var express       = require('express');
var path          = require('path');
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var configDB      = require('db.js');
var app           = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

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


app.use(function(req, res, next){
  res.status(404);
   res.send('404 Not Found');
});


/**
* App Routes go here
*/



module.exports = app;
