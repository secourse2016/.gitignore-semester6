var airports           = require("../app/data/airports.json");
var flights            = require("../app/data/flights.json");
var flight             = require('../app/models/flight');
var airport            = require('../app/models/airport');

/**
 * seed airport from airpors.json file if collection is empty
 */
exports.seedAirports = function seedAirports(cb){
    airport.count(function(err, count){
      if(count == 0)
        airport.create(airports, function(err, result){
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
      if(count == 0)
        flight.create(flights, function(err, result){
            cb(err, true);
        });
      else
          cb(err, false);
    });
}
/**
 * seed both flights and airpors
 */
exports.seed = function seed(cb){
    var seedFlights = this.seedFlights;
    this.seedAirports(function(err, check){
      if(err)
        cb(err,check);
      seedFlights(function(err, check){
        if(err)
          cb(err,check);
        cb(err,check);
      });
    });
}
