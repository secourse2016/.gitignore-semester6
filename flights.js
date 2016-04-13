require("dotenv").config();
var mongoose = require('mongoose');
mongoose.connect(process.env.mongoURL);
var flight = require('./app/models/flight');



/*
	this function returns all flights from origin to destination in the specefic date with the specific class given in the arguments
*/

var getOneDirectionFlights=module.exports.getOneDirectionFlights=function (cb, origin, destination, class1, date)
{
	// find documents in flights collection
	flight.find({"origin": origin, "destination": destination, "class": class1},{},function(err,resultFlights){

		// throw error if find returns an error
		if(err)
			throw err;
		else
		{
			// call the call back function with the result
			cb(resultFlights);
		}
	});
	
}

/*
	this function returns all flights from origin to destination in the specefic departure date and return flights in the arrival time (in case of round trips) with the specific class given in the arguments
*/

var getFlights=module.exports.getFlights=function (cb, origin, destination, class1, departureDate, arrivalDate)
{
	// get the flights in the outgoing flights
	getOneDirectionFlights(function(outgoingFlights)
	{
		// check if it is oneway trip
		if(arrivalDate == null)
		{
			// return the outgoing flights only
			cb(outgoingFlights);
		} else
		{
			// get the return flights as it is round trip
			getOneDirectionFlights(function(returnFlights)
			{
				// return both outgoing flights and return flights as one array
				cb(outgoingFlights.concat(returnFlights));
			}, destination, origin, class1, arrivalDate);

		}
	}, origin, destination, class1, departureDate);
}