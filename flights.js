var moment = require('moment');
/*
	this function returns all flights from origin to destination in the specefic date with the specific class given in the arguments
*/

var getOneDirectionFlights=module.exports.getOneDirectionFlights=function (cb, origin, destination, flightClass, date) {
	var startDate = moment(date,"x").toDate();
	var endDate = moment(date,"x").add(1,"days").toDate();

	// find documents in flights collection
	flight.find({"origin": origin, "destination": destination, "class": flightClass, departureDateTime : {"$gte" : startDate, "$lt": endDate}},{},function(err,resultFlights){

		// throw error if find returns an error
		if(err)
			throw err;
		else {
			// call the call back function with the result
			cb(resultFlights);
		}
	});

}

/*
	this function returns all flights from origin to destination in the specefic departure date and return flights in the arrival time (in case of round trips) with the specific class given in the arguments
*/

var getFlights=module.exports.getFlights=function (cb, origin, destination, flightClass, departureDate, arrivalDate){
	// get the flights in the outgoing flights
	getOneDirectionFlights(function(outgoingFlights){
		var result = {};
		// adding outgoing flights to the result
		result.outgoingFlights = outgoingFlights;
		// check if it is oneway trip
		if(arrivalDate == null) {
			// return result
			cb(result);
		}
		else {
			// get the return flights as it is round trip
			getOneDirectionFlights(function(returnFlights){
				// add return flights to the result in case of round trip and return result
				result.returnFlights = returnFlights;
				cb(result);
			}, destination, origin, flightClass, arrivalDate);

		}
	}, origin, destination, flightClass, departureDate);
}

var airport = require('./app/models/airport');

module.exports.getAirports = function(cb){
    airport.find(function(err, airports){
        cb(err, airports);
    });
};
