var http 	= require('http');
var fs 		= require('fs');
var moment 	= require('moment');

var flight 	= require('./app/models/flight');
var airport = require('./app/models/airport');
var booking = require('./app/models/booking');
var airlines= require('./app/data/airlines.json');
var jwt 	= require('jsonwebtoken');
var _       = require('underscore');


/**
 * Returns all flights from the origin to the destination in the specified
 * date with the specified class given in the arguments.
 */
var getOneDirectionFlights	= module.exports.getOneDirectionFlights
							= function(cb, origin, destination, flightClass, date){
	var startDate 	= moment(date, "x").toDate().getTime();
	var endDate		= moment(date, "x").add(1, "days").toDate().getTime();

	// Find documents in flights collection
	flight.find({"origin": origin, "destination": destination, "class": flightClass,
				 "departureDateTime" : {"$gte" : startDate, "$lt": endDate}}).lean().exec(
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
			   = function(cb, origin, destination, flightClass, departureDate, arrivalDate){
	// Get the outgoing flights
	getOneDirectionFlights(function(err, outgoingFlights){
		if(err)
			cb(err,{});
		var result = {};
		// Add outgoing flights to the result
		// edit the values of the flights and add flight ID and remove unwanted keys 
		_.map(outgoingFlights, function(flight){
			delete flight._id;
			delete flight.id;
			delete flight.__v;
			flight.flightId = flight._id;
			return flight;
		  });
		result.outgoingFlights = outgoingFlights;

		if(arrivalDate == null){	//One way
			cb(err, result);
		}
		else{						//Roundtrip
			getOneDirectionFlights(function(err2, returnFlights){
				if(err2)
					cb(err2);
				_.map(returnFlights, function(flight){
					delete flight._id;
					delete flight.id;
					delete flight.__v;
					flight.flightId = flight._id;
					return flight;
				  });
				result.returnFlights = returnFlights;
				cb(err2, result);
			}, destination, origin, flightClass, arrivalDate);

		}
	}, origin, destination, flightClass, departureDate);
}


var jwtToken = jwt.sign({},process.env.SECRET_KEY);

/**
 * Takes the search input, searches Austrian airline and other airlines
 * (if required), and returns JSON object containing outgoing flights and
 * return flights (if roundtrip).
 */
var getAllFlights = module.exports.getAllFlights
				  = function(cb, allAirlines, origin, destination, flightClass, departureDate, arrivalDate){
	// get flights from Austrian airlines
	getFlights(function(err, austrianFlights){
		_.map(austrianFlights.outgoingFlights, function(flight){
			flight.airline = {name:"Austrian Airlines" , url:"ec2-52-90-41-197.compute-1.amazonaws.com", ip:"52.90.41.197"};
			return flight;
		  });
		  _.map(austrianFlights.returnFlights, function(flight){
			  flight.airline = {name:"Austrian Airlines" , url:"ec2-52-90-41-197.compute-1.amazonaws.com", ip:"52.90.41.197"};
			  return flight;
			});
			console.log(austrianFlights.outgoingFlights);
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
			}, 0, allAirlines, origin, destination, flightClass, departureDate, arrivalDate);
		}
		else {
			// only Austrian airline flights
			cb(err,austrianFlights);
		}

	},origin, destination, flightClass, departureDate, arrivalDate);
}

/**
* Iterates (by recursion) over all airlines and returns their flights in a callback function
*/
var getOtherAirlines = function(cb, airlineIndex, allAirlines, origin, destination, flightClass, departureDate, arrivalDate){
	// Check if there are still airlines
	if(airlineIndex < airlines.length){
		// Get the URL of the airline or the IP
		var targetHost = airlines[airlineIndex].url?airlines[airlineIndex].url:airlines[airlineIndex].ip;
		//console.log(targetHost);
		// Get the API route
		var targetPath = '/api/flights/search/'+origin+'/'+destination+'/'+departureDate+'/'+flightClass;
		if(arrivalDate)
			targetPath = '/api/flights/search/'+origin+'/'+destination+'/'+departureDate+'/'+arrivalDate+'/'+flightClass;

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
						//add property airlines to all the flights
						_.map(flightsData.outgoingFlights, function(flight){
							flight.airline = airlines[airlineIndex];
							return flight;
						  });
						otherFlights.outgoingFlights = otherFlights.outgoingFlights.concat(flightsData.outgoingFlights);
						if(arrivalDate && flightsData.returnFlights){
							_.map(flightsData.returnFlights, function(flight){
								flight.airline = airlines[airlineIndex];
								return flight;
							  });
							  otherFlights.returnFlights = otherFlights.returnFlights.concat(flightsData.returnFlights);
						}
					}
					// Return the results
					cb(otherFlights);
				}, airlineIndex+1, allAirlines, origin, destination, flightClass, departureDate, arrivalDate);
			});

		}).on('error', function(e){
			// Error in the current request, try the next airlines
			getOtherAirlines(function(otherFlights){
				cb(otherFlights);
			}, airlineIndex+1, allAirlines, origin, destination, flightClass, departureDate, arrivalDate);
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
					for(i = 0 ; i < booking[0].passengers.length ; i++){
						if(booking[0].passengers[i].passportNumber === passportNumber){
							found = true;
							break;
						}
					}
					if(found){
						// get the corresponding outgoindg flight
						flight.find({"_id":booking[0].outgoingFlight},{},function(errOutgoingFlight , outgoingFlight){
								// get the corresponding return flight
								flight.find({"_id":booking[0].returnFlight},{},function(errReturnFlight , returnFlight){
									myBooking = booking[0].toJSON();
									// attach the flights info to the returning object
									myBooking.outgoingFlightInfo = outgoingFlight[0];
									if(returnFlight)
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
    	for (var i = 0 ; i < bookingInfo.passengers.length ; i++){
    		/* get the birth year of  the passenger with correct foramat */
    		var passengerBirthDate = new Date(bookingInfo.passengers[i].dateOfBirth);
    		var passengerBirthYear = passengerBirthDate.getFullYear();
			if (currentYear-passengerBirthYear < 12) 
				bookingInfo.passengers[i].isChild = true ;
			else
				bookingInfo.passengers[i].isChild = false ;
				/* changing the time format to match the schema */
	    		bookingInfo.passengers[i].dateOfBirth = passengerBirthDate.getTime();

		}
		/* Concatenate the number of records of the booking collection to the generatedBooking Number to get unique number*/
		newBooking.bookingNumber = generatedBookingNumber+c;
		newBooking.passengerDetails = bookingInfo.passengers;
		newBooking.outgoingFlightId = bookingInfo.outgoingFlightId;
		newBooking.returnFlightId = bookingInfo.returnFlightId;
		newBooking.cost = bookingInfo.cost;
		newBooking.bookingDate = Date.now();
		newBooking.save(function (err) {
			cb(err,newBooking.bookingNumber);
		});

	});
};
/**
 * [function description]
 * @param  {[type]}   requestParameters [description]
 * @param  {Function} cb                [description]
 * @return {[type]}                     [description]
 */
module.exports.handleBooking = function(requestParameters, cb){
	var airline1 = requestParameters.airline1;
	var airline2 = requestParameters.airline2;
	var booking1 = requestParameters.booking1;
	var booking2 = requestParameters.booking2;
	var targetHost1 = airline1.url?airline1.url:airline1.ip;
	// Assign the HTTP request options: host and path
	var options = {
		path: 'Booking?wt='+jwtToken,
		headers: { 'x-access-token': jwtToken }
	};
	// Call the HTTP POST request
	options.host =targetHost1;
	var status ;
	http.post(options, function(res){
		var bookingRes = res.body;
		if(bookingRes.errorMessage){
			error.errorMessage = bookingRes.errorMessage;
			error.airline = airline1;
			cb({},error);
		}else{
			status.airlin1.refNum = bookingRes.refNum;
			status.airlin1.info = airlin1;
			if(airline2){
				options.host = airline2.url?airline2.url:airline2.ip;
				http.post(options, function(req,res){
					req.body = booking2;
					bookingRes = res.body;
					if(bookingRes.errorMessage){
						error.errorMessage = bookingRes.errorMessage;
						error.airline = airline2;
						cb({},error);
					}else{
						status.airlin2.refNum = bookingRes.refNum;
						status.airlin2.info = airlin2;
					}
				});
			}else{
				cb(status,null);
			}
		}
	}).on('error', function(e){
		// Error in the current request, try the next airlines
		getOtherAirlines(function(otherFlights){
			cb(otherFlights);
		}, airlineIndex+1, allAirlines, origin, destination, flightClass, departureDate, arrivalDate);
	}).setTimeout(1000, function(){

		this.abort();
	}).write(booking1);

};
