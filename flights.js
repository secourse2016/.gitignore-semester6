var db = new require('./db.js');


var getOneDirectionFlights=module.exports.getOneDirectionFlights=function (cb, origin, destination, class, date)
{
	// get the database from db.js
	var dataBase=db.db();

	// get flights collection from database
	var flights = dataBase.get('flights');

	// find documents in flights collection
	flights.find({},{},function(err,docs){

		// throw error if find returns an error
		if(err)
			throw err;
		else
		{
			// create empty array as the result and counter to count how many flights have been added
			var result = [];
			var count = 0;

			// looping on all flights in the collection and add the flight if it has the same origin, destination and date as the arguments
			for (var i = 0; i < docs.length; i++) {
				if(docs[i].origin == origin && docs[i].destination == destination && docs[i].departureDate == date && docs[i].class == class)
				{
					result[count++] = docs[i];
				}
			}
			// call the call back function with the result
			cb(result);
		}
	});
	
}

var getFlights=module.exports.getFlights=function (cb, origin, destination, class, departureDate, arrivalDate)
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
			}, destination, origin, class, arrivalDate);

		}
	}, origin, destination, class, departureDate);
}
