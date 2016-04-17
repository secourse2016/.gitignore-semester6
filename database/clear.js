var flight             = require('../app/models/flight');
var airport            = require('../app/models/airport');

/**
* remove airports from airport if the collection was not empty .
*/
exports.removeAirports = function removeAirports(cb){
	airport.remove(function(err){
		cb(err);
	});
}

/**
* remove flights from flight if the collection was not empty .
*/
exports.removeFlights = function removeFlights(cb){
	flight.remove(function(err){
		cb(err);
	});
}

/**
* delete both flights and airpors.
* clear database.
*/
exports.clearDB = function clearDB(cb){
	var removeFlights = this.removeFlights;
	this.removeAirports(function(err){
		if(err)
			cb(err);
		else {
			removeFlights(function(err){
				cb(err);
			});
		}
	});
}
