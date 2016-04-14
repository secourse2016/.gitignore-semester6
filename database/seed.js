var airports           = require("../app/data/airports.json");
var flights            = require("../app/data/flights.json");
var Flight             = require('../app/models/flight');
var Airport            = require('../app/models/airport');

/**
 * seed airport from airpors.json file if collection is empty
 */
exports.seedAirports = function seedAirports(cb){
    Airport.collection.count( function ( err , c) { //check thier count
      if(c == 0)
        Airport.create(airports, function(err, result) {cb(err,true)});
      else
          cb(err, false);
    });
}

/**
 * seed flight from data in flights.json if collection is empty
 */
exports.seedFlights = function seedFlights(cb){
    Flight.collection.count( function (err , c) { //check thier count
      if(c == 0)
        Flight.create(flights, function(err, result) {cb(err,true)});
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
