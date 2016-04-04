var express = require("express");
var path    = require('path');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",function(req,res){
	res.render("index.html");
});

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

app.route('/flights').get(sendIndex);
app.route('/passengers').get(sendIndex);
app.route('/confirmation').get(sendIndex);
app.route('/payment').get(sendIndex);
app.route('/successful').get(sendIndex);

app.listen(80);
