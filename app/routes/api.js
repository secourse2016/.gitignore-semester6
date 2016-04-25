var express       = require('express');
var moment          = require('moment');
var flights       = require('../../flights');
var verifyToken   = require('../middlewares/tokenMiddleware');

var router        = express.Router();

// Middlewares ==========================================================

/**
 * JSON Web Token Verification Middleware
 */
router.use(verifyToken);

// API Routes (Protected Routes) ========================================

/**
* API route that returns all airports available for flight search
*/
router.get('/airports', function(req, res){
   flights.getAirports(function(err, airports){
     if(!err)
       res.json(airports);
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
router.get('/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
	// retrieve params
	var origin =  req.params.origin;
	var destination =  req.params.destination;
	var departingDate =  req.params.departingDate;
	var returningDate =  req.params.returningDate;
	var flightClass =  req.params.class;

	flights.getFlights(function(err, resultFlights){
    if(!err)
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
router.get('/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {
    // retrieve params
    var origin 			=  req.params.origin;
    var destination 	=  req.params.destination;
    var departingDate 	=  req.params.departingDate;
    var flightClass 	=  req.params.class;

	flights.getFlights(function(err, resultFlights){
    if(!err)
		  res.json(resultFlights);
	}, origin, destination, flightClass, moment(departingDate,"x"));

});

/**
* ROUND-TRIP SEARCH ENDPOINT [POST]
* This is the route used by the cliend side angular, to search for flights in Austrian and other airlines
* @param origin - Flight Origin Location
* @param destination - Flight Destination Location
* @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
* @param returningDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
* @param class - economy or business only
* @returns {Array}
*/
router.post('/flights/search/roundtrip', function(req, res){

    // Get the request parameters
    var origin        =  req.body.origin;
    var destination   =  req.body.destination;
    var departureDate =  moment(req.body.departureDate,['D MMMM, YYYY','LLLL','L','l','x','X','YYYY-MM-DD']).format('x');
    var arrivalDate   =  moment(req.body.arrivalDate,['D MMMM, YYYY','LLLL','L','l','x','X','YYYY-MM-DD']).format('x');
    var flightClass   =  req.body.flightClass;
    var allAirlines   =  req.body.allAirlines;

    // Get all the flights
    flights.getAllFlights(function(err, resultFlights){
        res.json(resultFlights);
    }, allAirlines, origin, destination, flightClass, departureDate, arrivalDate);
});

/**
* ONE-WAY SEARCH ENDPOINT [POST]
* This is the route used by the cliend side angular, to search for flights in Austrian and other airlines
* @param origin - Flight Origin Location
* @param destination - Flight Destination Location
* @param departingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
* @param returningDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
* @param class - economy or business only
* @returns {Array}
*/
router.post('/flights/search/oneway', function(req, res){

    // get the request parameters
    var origin        =  req.body.origin;
    var destination   =  req.body.destination;
    var departureDate =  moment(req.body.departureDate,['D MMMM, YYYY','LLLL','L','l','x','X','YYYY-MM-DD']).format('x');
    var flightClass   =  req.body.flightClass;
    var allAirlines   =  req.body.allAirlines;


    // get all the flights
    flights.getAllFlights(function(err, resultFlights){
      if(!err)
        res.json(resultFlights);
    }, allAirlines, origin, destination, flightClass, departureDate);
});


/**
* User-BOOK FLIGHT
* This is the route used by the client side angular, to book flight.
* @param req.body is the booking Info which was sent from confirmation Controller.
* @param flights.addBooking is the function in flights.js which insert the booking into the data base .
*/
router.post('/addBooking',function(req, res){
	flights.addBooking(req.body,function(err,bookingNumber){
        // if there is no error send booking Number
        if(!err)
            res.send(bookingNumber);

    });
});

/*
* API route to get a certain booking from the database
*/
router.post('/getBooking', function(req, res){
	var bookingNumber = req.body.bookingNumber;
	var passportNumber = req.body.passportNumber;
	flights.getBooking(bookingNumber , passportNumber , function(err, booking){
	    if(!err)
	      	res.json(booking);
	});
});

module.exports = router;
