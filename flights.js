var moment = require('moment');
var flight = require('./app/models/flight');
var airport = require('./app/models/airport');
var booking = require('./app/models/booking');


/*
	this function returns all flights from origin to destination in the specefic date with the specific class given in the arguments
*/

var getOneDirectionFlights=module.exports.getOneDirectionFlights=function (cb, origin, destination, flightClass, date) {
	var startDate = moment(date,"x").toDate().getTime();
	var endDate = moment(date,"x").add(1,"days").toDate().getTime();


	// find documents in flights collection
	flight.find({"origin": origin, "destination": destination, "class": flightClass, departureDateTime : {"$gte" : startDate, "$lt": endDate}},{},function(err,resultFlights){
			// call the call back function with the result
			cb(err, resultFlights);
		
	});

}

/*
*	this function returns all flights from origin to destination in the specefic departure date and return flights in the arrival time (in case of round trips) with the specific class given in the arguments
*/

var getFlights=module.exports.getFlights=function (cb, origin, destination, flightClass, departureDate, arrivalDate){
	// get the flights in the outgoing flights
	getOneDirectionFlights(function(err, outgoingFlights){
		if(err)
			cb(err);
		var result = {};
		// adding outgoing flights to the result
		result.outgoingFlights = outgoingFlights;
		// check if it is oneway trip
		if(arrivalDate == null) {
			// return result
			cb(err, result);
		}
		else {
			// get the return flights as it is round trip
			getOneDirectionFlights(function(err2, returnFlights){
				if(err2)
					cb(err2);
				// add return flights to the result in case of round trip and return result
				result.returnFlights = returnFlights;
				cb(err2, result);
			}, destination, origin, flightClass, arrivalDate);

		}
	}, origin, destination, flightClass, departureDate);
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
/**
*Get all Booking Information and inserting it into the database.
*/

 module.exports.addBooking = function(bookingInfo){

	var newBooking = new booking();
	newBooking.passengers = bookingInfo.passengers;
	newBooking.outgoingFlight = bookingInfo.outgoingFlight;
	newBooking.returnFlight = bookingInfo.returnFlight; 
	newBooking.totalPrice = bookingInfo.totalPrice;
	newBooking.bookingDate = Date.now();
	newBooking.isSuccessful = true ;
	newBooking.save(function (err) {
  	if (err) throw err;
  });
}