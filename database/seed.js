var airports           = require("../app/data/airports.json");
var flights            = require("../app/data/flights.json");
var flight             = require('../app/models/flight');
var firport            = require('../app/models/airport');

/**
 * seed airport from airpors.json file if collection is empty
 */
exports.seedAirports = function seedAirports(cb){
    airport.collection.count( function ( err , c) { //check thier count
      if(c == 0)
        airport.create(airports, function(err, result) {cb(err,true)});
      else
          cb(err, false);
    });
}

/**
 * seed flight from data in flights.json if collection is empty
 */
exports.seedFlights = function seedFlights(cb){
    flight.collection.count( function (err , c) { //check thier count
      if(c == 0)
        flight.create(flights, function(err, result) {cb(err,true)});
      else
          cb(err, false);
    });
}
/**
 * seed both flights and airpors
 */
exports.seed = function seed(){
    this.seedFlights(function(err, chk){
      if(err)
        throw err;
    });
    this.seedAirports(function(err, chk){
      if(err)
        throw err;

    });
}
