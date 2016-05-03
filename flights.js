var http 	= require('http');
var fs 		= require('fs');
var moment 	= require('moment');
var flight 	= require('./app/models/flight');
var airport = require('./app/models/airport');
var booking = require('./app/models/booking');
var airlines= require('./app/data/airlines.json');
var jwt 	= require('jsonwebtoken');
var qs      = require('qs');
var request = require('request');
var _       = require('underscore');
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
				 "departureDateTime" : {"$gte" : startDate, "$lt": endDate}, "availableSeats" : {"$gte" : numberOfPassengers}})
	.lean().exec( function(err, resultFlights){
				cb(err, resultFlights);});
	
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
		// edit the values of the flights and add flight ID and remove unwanted keys

		_.map(outgoingFlights, function(flight){
			flight.flightId = flight._id;
			delete flight._id;
			delete flight.id;
			delete flight.__v;
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
					flight.flightId = flight._id;
					delete flight._id;
					delete flight.id;
					delete flight.__v;
					return flight;
				  });
				result.returnFlights = returnFlights;
				cb(err2, result);
			}, destination, origin, flightClass, arrivalDate, numberOfPassengers);

		}
	}, origin, destination, flightClass, departureDate, numberOfPassengers);
}


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
		_.map(austrianFlights.outgoingFlights, function(flight){
			flight.airline = {name:"Austrian Airlines" , url:"ec2-52-90-41-197.compute-1.amazonaws.com", ip:"52.90.41.197"};
			return flight;
		  });
		  _.map(austrianFlights.returnFlights, function(flight){
			  flight.airline = {name:"Austrian Airlines" , url:"ec2-52-90-41-197.compute-1.amazonaws.com", ip:"52.90.41.197"};
			  return flight;
			});
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
		// Get the URL of the airline or the IP
		var targetHost = airlines[airlineIndex].url?airlines[airlineIndex].url:airlines[airlineIndex].ip;
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
				}, airlineIndex+1, allAirlines, origin, destination, flightClass, departureDate, arrivalDate, numberOfPassengers);
			});

		}).on('error', function(e){
			// Error in the current request, try the next airlines
			getOtherAirlines(function(otherFlights){
				cb(otherFlights);
			}, airlineIndex+1, allAirlines, origin, destination, flightClass, departureDate, arrivalDate, numberOfPassengers);
		}).setTimeout(2000, function(){

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
 * Add-Booking is a function which takes booking information, charges the customer
 * and inserting it into the database.
 * @param newBooking is instance of new booking model record .
 * @param generatedBookingNumber is a fixed value which all booking numbers begin with.
 */
 var addBooking = module.exports.addBooking = function addBooking(bookingInfo, cb){

 	// Parse the booking information into JSON
 	bookingInfo = qs.parse(bookingInfo);
 	
 	if(bookingInfo.outgoingFlightId) {
 		// Charge the outgoing flight
 		var totalCost = 0;
 		flight.find({"_id" : bookingInfo.outgoingFlightId},{}, function(error, flights){
 			// Get the outgoing flight
 			if(!error && flights[0]) {
 				var outgoingFlight = flights[0];

 				// Calculate the flight cost, with respect to number of passengers
 				totalCost += parseInt(outgoingFlight.cost)*bookingInfo.passengerDetails.length;

 				// Check if there is a return flight in the booking
 				if(bookingInfo.returnFlightId) {
 					flight.find({"_id" : bookingInfo.returnFlightId}, {}, function(error2, flights){
 						// Get the return flight
 						if(!error2 && flights[0]) {
 							var returnFlight = flights[0];
 							// increment the cost
 							totalCost += parseInt(returnFlight.cost)*bookingInfo.passengerDetails.length;
 							// charge the two flights
 							chargeBooking(totalCost, bookingInfo.paymentToken, function(paymentError, charge){
 								if(paymentError){
 									cb(paymentError, null);
 								}
 								else {
 									// save the booking if everything is successful
 									saveBooking(bookingInfo, function(err, bookingNumber){
 										cb(err, bookingNumber);
 									});
 								}
 							});
 						}
 						else
 						{
 							cb(error,null);
 						}
 					});
 				}
 				else {
 					// oneway flight, charge the outgoing only
 					chargeBooking(totalCost, bookingInfo.paymentToken, function(paymentError, charge){
						if(paymentError){
							cb(paymentError, null);
						}
						else {
							// save the booking if everything is successful
							saveBooking(bookingInfo, function(err, bookingNumber){
								cb(err, bookingNumber);
							});
						}
					});
 				}
 			}
 			else {
 				cb(error, null);
 			}

 		});


 	}
 	else
 		cb(new Error("INVALID REQUEST"), null)
	
	
	
};

/**
*	Save a successful booking in the database
*/
var saveBooking = function(bookingInfo, cb) {
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

	    		var seatLetter = String.fromCharCode(Math.floor(Math.random()*6)+ 65);
	    		bookingInfo.passengerDetails[i].seat = (Math.floor(Math.random()*33) + 1) + seatLetter;

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
}



/**
* Charge a customer with a certain cost
*/
var chargeBooking = function(totalCost, paymentToken, cb){
	
	stripe.charges.create({
	  	amount: totalCost*100, // amount in cents
	  	currency: "usd",
	  	source: paymentToken,
	  	description: "Charge booking by austrian airlines"
	}, function(err, charge) {
	  	cb(err, charge);
	});

 	
}
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
		var conditions = { "_id": flightId },
   			update = { $inc: { availableSeats: - numberOfPassengers }};
		flight.update(conditions, update, {}, function(err, affectedRows){
			
		});
	};
/*
 * [send post request with booking info if it is not
 * from our airlines else call server function]
 * @type {[type]}
 */
var postBooking = module.exports.postBookingRequests = function postBookingRequests(airline, booking, cb){
	if(airline  && airline.ip === "52.90.41.197"){
	   addBooking(booking,function(error , refNum){
		   if(error){
		   		airline.errorMessage = error.message;
			 	cb(0,airline);
		   }
		   else {
			  airline.refNum = refNum;
			  cb(0,airline);
		   }
	   });
	}
	else { 
		if(airline){
				// Determine the target URI of the request
		   var target = 'http://'+(airline.url?airline.url:airline.ip)+'/booking?wt='+jwtToken;
		   var postData = booking;

		   // Send the HTTP request
		   request({
		   	uri : target,
		   	method: 'POST',
		   	body: booking,
		   	json: true,
		   	timeout: 7000
		   }
		   ,function(err, response, body){
			   	if(!err){
			   		// No connection error, assign the results
			   		airline.errorMessage = response.body.errorMessage;
			   		airline.refNum = response.body.refNum;
				}
		   		cb(err, airline);
		   });
		   

	}
	else{
	   cb(0,{});
	}

	}
};


/**
 * [Function send the Post requests to the airlines ]
 * @param  {[object with airline and Booking]}   requestParameters [description]
 * @param  {Function} cb                [description]
 * @return {[type]}                     [description]
 */
 module.exports.handleBooking = function(requestParameters, cb){
	var airline1 = requestParameters.airline1;
	var airline2 = requestParameters.airline2;
	var booking1 = requestParameters.booking1;
	var booking2 = requestParameters.booking2;
	var status 	 = {};
	postBooking(airline1, booking1, function(error1, airline1Status){
		status.airline1 = airline1Status;
		if(!error1){

			if(airline2){
				postBooking(airline2, booking2, function(error2, airline2Status){
					status.airline2 = airline2Status;
					cb(error1, error2, status);
				});
			}else{
				cb(error1, null, status);
			}
		}else{
			cb(error1, null,status);
		}

	});
};
