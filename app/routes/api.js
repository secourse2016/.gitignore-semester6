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
router.get('/flights/search/:origin/:destination/:departingDate/:returningDate/:class/:seats', function(req, res) {
	// retrieve params
	var origin             =  req.params.origin;
	var destination        =  req.params.destination;
	var departingDate      =  req.params.departingDate;
	var returningDate      =  req.params.returningDate;
	var flightClass        =  req.params.class;
  var numberOfPassengers =  req.params.seats;
  if(numberOfPassengers < 0)
  {
    res.send("ERROR");
    return;
  }
	flights.getFlights(function(err, resultFlights){
    if(!err)
		  res.json(resultFlights);
	}, origin, destination, flightClass, moment(departingDate,"x"), moment(returningDate,"x"), numberOfPassengers);
});

/**
* ONE-WAY SEARCH REST ENDPOINT
* @param origin - Flight Origin Location
* @param DepartingDate - JavaScript Date.GetTime() numerical value corresponding to format `YYYY-MM-DD`
* @param class - economy or business only
* @returns {Array}
*/
router.get('/flights/search/:origin/:destination/:departingDate/:class/:seats', function(req, res) {
    // retrieve params
    var origin 			       =  req.params.origin;
    var destination 	     =  req.params.destination;
    var departingDate 	   =  req.params.departingDate;
    var flightClass 	     =  req.params.class;
    var numberOfPassengers =  req.params.seats;
    if(numberOfPassengers < 0)
    {
      res.send("ERROR");
      return;
    }
	flights.getFlights(function(err, resultFlights){
    if(!err)
		  res.json(resultFlights);
	}, origin, destination, flightClass, moment(departingDate,"x"), null, numberOfPassengers);

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
    var origin              =  req.body.origin;
    var destination         =  req.body.destination;
    var departureDate       =  moment(req.body.departureDate,['D MMMM, YYYY','LLLL','L','l','x','X','YYYY-MM-DD']).format('x');
    var arrivalDate         =  moment(req.body.arrivalDate,['D MMMM, YYYY','LLLL','L','l','x','X','YYYY-MM-DD']).format('x');
    var flightClass         =  req.body.flightClass;
    var allAirlines         =  req.body.allAirlines;
    var numberOfPassengers  =  req.body.numberOfPassengers;
    if(numberOfPassengers < 0)
    {
      res.send("ERROR");
      return;
    }
    // Get all the flights
    flights.getAllFlights(function(err, resultFlights){
        res.json(resultFlights);
    }, allAirlines, origin, destination, flightClass, departureDate, arrivalDate, numberOfPassengers);
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
    var origin              =  req.body.origin;
    var destination         =  req.body.destination;
    var departureDate       =  moment(req.body.departureDate,['D MMMM, YYYY','LLLL','L','l','x','X','YYYY-MM-DD']).format('x');
    var flightClass         =  req.body.flightClass;
    var allAirlines         =  req.body.allAirlines;
    var numberOfPassengers  =  req.body.numberOfPassengers;
    if(numberOfPassengers < 0)
    {
      res.send("ERROR");
      return;
    }
    // get all the flights
    flights.getAllFlights(function(err, resultFlights){
      if(!err)
        res.json(resultFlights);
    }, allAirlines, origin, destination, flightClass, departureDate, null, numberOfPassengers);
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

/**
 * [post request is responsible for handling booking requests from the website]
 * @param  {[route url]} '/addBooking' [description]
 * @param  {[function]} function(req, res           [description]
 * @return {[ refNum: String,errorMessage: String]}  [description]
 */
router.post('/addBooking',function(req, res){
	flights.handleBooking(req.body,function(err1, err2,status){
        // if there is no error send status of booking
        status.error1 = err1;
        status.error2 = err2;
        res.send(status);
    });
});


module.exports = router;
