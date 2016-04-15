var express       = require('express');
var path          = require('path');
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var moment		  = require('moment');
var app           = express();
require('dotenv').config();

// models ===============================================================
var flights       = require('./flights');

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


// App Routes go here ==========================================================

/**
* API route that returns all airports available for flight search
*/
app.get('/api/airports', function(req, res){
    flights.getAirports(function(err, airports){
        if(err)
            res.send(err);
        res.json(airports);
    });
});

/*
* API route to get a certain booking from the database
*/
app.post('/api/booking-history', function(req, res){
  var id = req.body.id;
  var passportNumber = req.body.passportNumber;
    flights.getBooking(id , passportNumber , function(err, booking){
        if(err)
            res.send(err);
        res.json(booking);
    });
});

/**
* ROUND-TRIP SEARCH REST ENDPOINT
* @param origin - Flight Origin Location
* @param destination - Flight Destination Location
* @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
* @param returningDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
* @param class - economy or business only
* @returns {Array}
*/
app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
	// retrieve params
	var origin =  req.params.origin;
	var destination =  req.params.destination;
	var departingDate =  req.params.departingDate;
	var returningDate =  req.params.returningDate;
	var flightClass =  req.params.class;

	flights.getFlights(function(err, resultFlights){
		if(err)
			res.send(err);
		res.json(resultFlights);

	}, origin, destination, flightClass, moment(departingDate,"x"), moment(returningDate,"x"));
});

/**
* ONE-WAY SEARCH REST ENDPOINT
* @param origin - Flight Origin Location
* @param DepartingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
* @param class - economy or business only
* @returns {Array}
*/

app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {
    // retrieve params
    var origin 			=  req.params.origin;
    var destination 	=  req.params.destination;
    var departingDate 	=  req.params.departingDate;
    var flightClass 	=  req.params.class;

	flights.getFlights(function(err, resultFlights){
		if(err)
			res.send(err);
		res.json(resultFlights);

	}, origin, destination, flightClass, moment(departingDate,"x"));
});

app.use(function(req, res, next){
  res.status(404);
   res.send('404 Not Found');
});

module.exports = app;
