var express = require("express");
var path    = require('path');
var morgan = require('morgan');

var app = express();
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",function(req,res){
	res.render("index.html");
});
app.route('/about').get(function(req, res) {
    return res.sendFile(__dirname + '/public/index.html');
});

app.route('/help').get(function(req, res) {
    return res.sendFile(__dirname + '/public/index.html');
});

app.route('/contact').get(function(req, res) {
    return res.sendFile(__dirname + '/public/index.html');
});

app.route('/termsAndConditions').get(function(req, res) {
    return res.sendFile(__dirname + '/public/index.html');
});

app.route('/privacypolicy').get(function(req, res) {
    return res.sendFile(__dirname + '/public/index.html');
});

app.route('/bookAFlight').get(function(req, res) {
    return res.sendFile(__dirname + '/public/index.html');
});

app.route('/offers').get(function(req, res) {
    return res.sendFile(__dirname + '/public/index.html');
});

app.route('/pricing').get(function(req, res) {
    return res.sendFile(__dirname + '/public/index.html');
});

app.route('/passengers').get(function(req, res) {
    return res.sendFile(__dirname + '/public/index.html');
});

app.route('/confirmation').get(function(req, res) { 
    return res.sendFile(__dirname + '/public/index.html'); 
});
app.listen(80);
