var http 	= require('http');
var fs 		= require('fs');
var moment 	= require('moment');

var flight 	= require('./app/models/flight');
var airport = require('./app/models/airport');
var booking = require('./app/models/booking');

/**
 * Returns all flights from the origin to the destination in the specified
 * date with the specified class given in the arguments.
 */
var getOneDirectionFlights	= module.exports.getOneDirectionFlights
							= function(cb, origin, destination, flightClass, date) {
	var startDate 	= moment(date, "x").toDate().getTime();
	var endDate		= moment(date, "x").add(1, "days").toDate().getTime();

	// Find documents in flights collection
	flight.find({"origin": origin, "destination": destination, "class": flightClass,
				 "departureDateTime" : {"$gte" : startDate, "$lt": endDate}}, {},
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
		result.outgoingFlights = outgoingFlights;

		if(arrivalDate == null){	//One way
			cb(err, result);
		}else{						//Roundtrip
			getOneDirectionFlights(function(err2, returnFlights){
				if(err2)
					cb(err2);
				result.returnFlights = returnFlights;
				cb(err2, result);
			}, destination, origin, flightClass, arrivalDate);

		}
	}, origin, destination, flightClass, departureDate);
}

var airlines = JSON.parse(fs.readFileSync('./app/data/airlines.json', 'utf8'));

/**
 * Takes the search input, searches Austrian airline and other airlines
 * (if required), and returns JSON object containing outgoing flights and
 * return flights (if roundtrip).
 */
var getAllFlights = module.exports.getAllFlights
				  = function(cb, allAirlines, origin, destination, flightClass, departureDate, arrivalDate){
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
		// Get the URL of the airline
		var targetHost = airlines[airlineIndex];

		// Get the API route
		var targetPath = '/api/flights/search/'+origin+'/'+destination+'/'+departureDate+'/'+flightClass;
		if(arrivalDate)
			targetPath = '/api/flights/search/'+origin+'/'+destination+'/'+departureDate+'/'+arrivalDate+'/'+flightClass;

		// Assign the HTTP request options: host and path
		var options = { host: targetHost, path: targetPath };

		// Call the HTTP GET request
		http.get(options, function(res){

			var flightsData = {};
			res.on('data', function(flights){
				// Successful request
				flightsData = flights;
			});
			res.on('end', function(){

				// Get flights of next airline and add the result to the current airlines' flights
				getOtherAirlines(function(otherFlights){
					// Parse the data of the flights of the current airline into JSON
					flightsData = JSON.parse(flightsData);

					// Add the current flights to the flights of the next airlines
					otherFlights.outgoingFlights = otherFlights.outgoingFlights.concat(flightsData.outgoingFlights);
					if(arrivalDate)
						otherFlights.returnFlights = otherFlights.returnFlights.concat(flightsData.returnFlights);
					// Return the results
					cb(otherFlights);
				}, airlineIndex+1, allAirlines, origin, destination, flightClass, departureDate, arrivalDate);
			});


		}).on('error', function(e){
			// Error in the current request, try the next airlines
			getOtherAirlines(function(otherFlights){
					cb(otherFlights);
			}, airlineIndex+1, allAirlines, origin, destination, flightClass, departureDate, arrivalDate);
		});
	}else{
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
