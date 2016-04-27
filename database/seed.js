var flights            = require("../app/data/flights.json");
var airports           = require("../app/data/airports.json");
var flight             = require('../app/models/flight');
var airport            = require('../app/models/airport');

/**
* seed airport from airpors.json file if collection is empty
*/
exports.seedAirports = function seedAirports(cb){
    airport.count(function(err, count){
        if(count === 0)
            airport.create(airports, function(err){
                cb(err, true);
        });
        else
            cb(err, false);
    });
}

/**
* seed flight from data in flights.json if collection is empty
*/
exports.seedFlights = function seedFlights(cb){
    flight.count(function(err, count){
        if(count === 0)
            flight.create(flights, function(err){
                cb(err, true);
        });
        else
            cb(err, false);
    });
}

/**
 * Seed both flights and airports
 */
exports.seed = function seed(cb){
    var seedFlights = this.seedFlights;
    this.seedAirports(function(err, check){
        if(err)
            cb(err,check);
        else{
            seedFlights(function(err, check){
                cb(err,check);
            });
        }
    });
}
