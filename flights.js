var http 	= require('http');
var fs 		= require('fs');
var moment 	= require('moment');

var flight 	= require('./app/models/flight');
var airport = require('./app/models/airport');
var booking = require('./app/models/booking');
var jwt 	= require('jsonwebtoken');
var stripe 	= require('stripe')(process.env.STRIPE_KEY);


/**
 * Returns all flights from the origin to the destination in the specified
 * date with the specified class given in the arguments.
 */
var getOneDirectionFlights	= module.exports.getOneDirectionFlights
							= function(cb, origin, destination, flightClass, date, numberOfPassengers){
	var startDate 	= moment(date, "x").toDate().getTime();
	var endDate		= moment(date, "x").add(1, "days").toDate().getTime();

	// Find documents in flights collection
	flight.find({"origin": origin, "destination": destination, "class": flightClass,
				 "departureDateTime" : {"$gte" : startDate, "$lt": endDate}, "availableSeats" : {"$gte" : numberOfPassengers}}, {},
				 function(err, resultFlights){
		cb(err, resultFlights);
	});
}

/**
 * Returns all outgoing flights from the origin to the destination in the
 * specified departure date and all return flights in the arrival time
 * (in case of round trips) with the specified class given in the arguments.
 */
var getFlights = module.exports.getFlights
			   = function(cb, origin, destination, flightClass, departureDate, arrivalDate, numberOfPassengers){
	// Get the outgoing flights
	getOneDirectionFlights(function(err, outgoingFlights){
		if(err)
			cb(err,{});
		var result = {};
		// Add outgoing flights to the result
		result.outgoingFlights = outgoingFlights;

		if(arrivalDate == null){	//One way
			cb(err, result);
		}
		else{						//Roundtrip
			getOneDirectionFlights(function(err2, returnFlights){
				if(err2)
					cb(err2);
				result.returnFlights = returnFlights;
				cb(err2, result);
			}, destination, origin, flightClass, arrivalDate, numberOfPassengers);

		}
	}, origin, destination, flightClass, departureDate, numberOfPassengers);
}

var airlines = JSON.parse(fs.readFileSync('./app/data/airlines.json', 'utf8'));

var jwtToken = jwt.sign({},process.env.SECRET_KEY);

/**
 * Takes the search input, searches Austrian airline and other airlines
 * (if required), and returns JSON object containing outgoing flights and
 * return flights (if roundtrip).
 */
var getAllFlights = module.exports.getAllFlights
				  = function(cb, allAirlines, origin, destination, flightClass, departureDate, arrivalDate, numberOfPassengers){
	// get flights from Austrian airlines
	getFlights(function(err, austrianFlights){
		if(err)
			cb(err,{});
		else if(allAirlines){
			// get flights from other airlines
			getOtherAirlines(function(otherFlights){

				// add other airlines' flights to our flights
				austrianFlights.outgoingFlights = austrianFlights.outgoingFlights.concat(otherFlights.outgoingFlights);

				if(arrivalDate)
					austrianFlights.returnFlights = austrianFlights.returnFlights.concat(otherFlights.returnFlights);
				cb(err, austrianFlights);
			}, 0, allAirlines, origin, destination, flightClass, departureDate, arrivalDate, numberOfPassengers);
		}
		else {
			// only Austrian airline flights
			cb(err,austrianFlights);
		}

	},origin, destination, flightClass, departureDate, arrivalDate, numberOfPassengers);
}

/**
* Iterates (by recursion) over all airlines and returns their flights in a callback function
*/
var getOtherAirlines = function(cb, airlineIndex, allAirlines, origin, destination, flightClass, departureDate, arrivalDate, numberOfPassengers){
	// Check if there are still airlines
	if(airlineIndex < airlines.length){
		// Get the URL of the airline
		var targetHost = airlines[airlineIndex];

		// Get the API route
		var targetPath = '/api/flights/search/'+origin+'/'+destination+'/'+departureDate+'/'+flightClass+'/'+numberOfPassengers;
		if(arrivalDate)
			targetPath = '/api/flights/search/'+origin+'/'+destination+'/'+departureDate+'/'+arrivalDate+'/'+flightClass+'/'+numberOfPassengers;

		// Assign the HTTP request options: host and path
		var options = {
			host: targetHost,
			path: targetPath + '?wt='+jwtToken,
			headers: { 'x-access-token': jwtToken }
		};

		// Call the HTTP GET request
		http.get(options, function(res){

			var flightsData = "";
			res.on('data', function(flights){
				// Successful request
				flightsData += flights;
			});
			res.on('end', function(){

				// Get flights of next airline and add the result to the current airlines' flights
				getOtherAirlines(function(otherFlights){

					// Parse the data of the flights of the current airline into JSON

					var isJSON = true;
					try{
						flightsData = JSON.parse(flightsData);

					}
					catch(e){
						isJSON = false;
					}

					// Add the current flights to the flights of the next airlines
					if(flightsData.outgoingFlights && isJSON){
						otherFlights.outgoingFlights = otherFlights.outgoingFlights.concat(flightsData.outgoingFlights);
						if(arrivalDate && flightsData.returnFlights)
							otherFlights.returnFlights = otherFlights.returnFlights.concat(flightsData.returnFlights);
					}
					// Return the results
					cb(otherFlights);
				}, airlineIndex+1, allAirlines, origin, destination, flightClass, departureDate, arrivalDate, numberOfPassengers);
			});

		}).on('error', function(e){
			// Error in the current request, try the next airlines
			getOtherAirlines(function(otherFlights){
				cb(otherFlights);
			}, airlineIndex+1, allAirlines, origin, destination, flightClass, departureDate, arrivalDate, numberOfPassengers);
		}).setTimeout(1000, function(){

			this.abort();
		});
	}
	else{
		// Base case of recursion, return empty data that will be filled
		if(arrivalDate)
			cb({ outgoingFlights:[], returnFlights:[] });
		else
			cb({ outgoingFlights:[] });
	}
}

/**
 * Get all airports that can be available for flight search
 * @param  {Function} cb will be called with (err, airports)
 */
module.exports.getAirports = function(cb){
	airport.find(function(err, airports){
		cb(err, airports);
	});
};

/*
* Search for a certain booking in the database and return it
*/
module.exports.getBooking = function(bookingNumber , passportNumber , cb){

		var myBooking = {};
		// get booking record from database
    booking.find({"bookingNumber":bookingNumber}, {} , function(errBooking, booking){
				var found = false;
				if(booking.length == 0)
					cb(errBooking, null);
				else {
					// check the passport number
					for(i = 0 ; i < booking[0].passengerDetails.length ; i++){
						if(booking[0].passengerDetails[i].passportNum === passportNumber){
							found = true;
							break;
						}
					}
					if(found){
						// get the corresponding outgoing flight
						flight.find({"_id":booking[0].outgoingFlightId},{},function(errOutgoingFlight , outgoingFlight){
								// get the corresponding return flight
								flight.find({"_id":booking[0].returnFlightId},{},function(errReturnFlight , returnFlight){
									myBooking = booking[0].toJSON();
									// attach the flights info to the returning object
									myBooking.outgoingFlightInfo = outgoingFlight[0];
									myBooking.returnFlightInfo = returnFlight[0];
									cb(errReturnFlight, myBooking);
								});
						});
					}
					else {
						cb(errBooking , null);
					}
			}
    });
};

/**
 * Add-Booking is a function which takes booking information and inserting it intothe data base.
 * @param newBooking is instance of new booking model record .
 * @param generatedBookingNumber is a fixed value which all booking numbers begin with.
 */
module.exports.addBooking = function(bookingInfo, cb){

	var newBooking = new booking();
	var generatedBookingNumber = "6D4B97";
	/* counting all the records in the booking collection */
	booking.count({},function(err,c){
		/* check if the passenger is child or not */
  		var currentDate= new Date();
    	var currentYear = currentDate.getFullYear();
			var numberOfPassengers = bookingInfo.passengerDetails.length;
    	for (var i = 0 ; i < numberOfPassengers ; i++){
    		/* get the birth year of  the passenger with correct foramat */
    		var passengerBirthDate = new Date(bookingInfo.passengerDetails[i].dateOfBirth);
    		var passengerBirthYear = passengerBirthDate.getFullYear();
			if (currentYear-passengerBirthYear < 12)
				bookingInfo.passengerDetails[i].isChild = true ;
			else
				bookingInfo.passengerDetails[i].isChild = false ;
				/* changing the time format to match the schema */
	    		bookingInfo.passengerDetails[i].dateOfBirth = passengerBirthDate.getTime();

		}
		/* Concatenate the number of records of the booking collection to the generatedBooking Number to get unique number*/
		newBooking.bookingNumber = generatedBookingNumber+c;
		newBooking.passengerDetails = bookingInfo.passengerDetails;
		newBooking.outgoingFlightId = bookingInfo.outgoingFlightId;
		newBooking.returnFlightId = bookingInfo.returnFlightId;
		newBooking.cost = bookingInfo.cost;
		newBooking.bookingDate = Date.now();
		newBooking.save(function (err) {
			if(!err)
				updateAvailableSeats(bookingInfo.outgoingFlightId, bookingInfo.returnFlightId, numberOfPassengers);
			cb(err,newBooking.bookingNumber);
		});

	});
};
/**
 * update availableSeats in flights by decrementing number of available seats with number of passengers
 * by calling updateFlightSeats with id and number of passengers.
 * @param outgoingFlightId is the id of the outgoind flight selected.
 * @param returnFlightId is the id of the outgoind flight selected.
 * @param numberOfPassengers is the number of passengers selected.
 */
	function updateAvailableSeats(outgoingFlightId, returnFlightId, numberOfPassengers){
		if(outgoingFlightId)
			updateFlightSeats(outgoingFlightId, numberOfPassengers);
		if(returnFlightId)
			updateFlightSeats(returnFlightId, numberOfPassengers);
	};

	/**
	 * update availableSeats in flights by decrementing number of available seats with number of passengers.
	 * @param flightId is the id of the flight selected (outgoing or return).
	 * @param numberOfPassengers is the number of passengers selected.
	 */
	function updateFlightSeats(flightId, numberOfPassengers){
		var conditions = { _id: flightId },
   			update = { $dec: { availableSeats: numberOfPassengers }};
		Model.update(conditions, update);
	};
