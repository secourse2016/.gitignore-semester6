var express       = require('express');
var path          = require('path');
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var compression   = require('compression');
var seed          = require('./database/seed');
var moment		  = require('moment');
var db = require('./database/seed');
var clear          = require('./database/clear');
var moment		    = require('moment');
var morgan        = require('morgan');
var app           = express();
require('dotenv').config();

// functions ==============================================================
var flights       = require('./flights');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// configuration ==========================================================
mongoose.connect(process.env.mongoURL); // connect to our database
db.seed(function(err , check){
  console.log(check);
});
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


// Unproteceted App Routes go here ========================================
/**
 *	Seed database and return error if
 *	the operation doesn't complete.
 */
 app.get('/db/seed', function(req, res) {
     seed.seed(function (err ,check){
         if(!err){
             if(!check){
                 res.json({message: "database was seeded"});
             }else{
                 res.json({message: "database seeded successfuly"});
             }
         }
     });
 });

/**
 *	clear database and return error if the operation did not succeed.
*/
 app.get('/db/clear', function(req, res) {
     clear.clearDB(function (err){
         if(!err){
            res.json({message: "database was cleared successfuly"});
         }
     });
 });

// middlewares ============================================================
var verifyToken   = require('./app/middlewares/tokenMiddleware');

/**
 * JSON Web Token Verification Middleware
 */
app.use(verifyToken);

// Proteceted App Routes go here ==========================================

/**
* API route that returns all airports available for flight search
*/
app.get('/api/airports', function(req, res){
    flights.getAirports(function(err, airports){
      if(!err)
        res.json(airports);
    });
});

/*
* API route to get a certain booking from the database
*/
app.post('/api/search-booking', function(req, res){
  var bookingNumber = req.body.bookingNumber;
  var passportNumber = req.body.passportNumber;
    flights.getBooking(bookingNumber , passportNumber , function(err, booking){
        if(!err)
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
app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {
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
app.post('/api/flights/search/roundtrip', function(req, res){

    // Get the request parameters
    var origin        =  req.body.origin;
    var destination   =  req.body.destination;
    var departureDate =  moment(req.body.departureDate,['D MMMM, YYYY','LLLL','L','l','x','X','YYYY-MM-DD']).format('x');
    var arrivalDate   =  moment(req.body.arrivalDate,['D MMMM, YYYY','LLLL','L','l','x','X','YYYY-MM-DD']).format('x');
    var flightClass   =  req.body.flightClass;
    var allAirlines   =  req.body.allAirlines;

    // Get all the flights
    flights.getAllFlights(function(err, resultFlights){
      if(!err)
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
app.post('/api/flights/search/oneway', function(req, res){

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
*User-BOOK FLIGHT 
* This is the route used by the client side angular, to book flight.
* @param req.body is the booking Info which was sent from confirmation Controller.
* @param flights.addBooking is the function in flights.js which insert the booking into the data base .
*/

app.post('/api/addBooking',function(req, res){
	flights.addBooking(req.body,function(err,bookingNumber){
        /* if there is no error send booking Number */
        if(!err)
            res.send(bookingNumber);

    });
});


app.use(function(req, res, next){
  res.status(404);
   res.send('404 Not Found');
});


module.exports = app;
