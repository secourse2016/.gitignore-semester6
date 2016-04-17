var flights            = require("../app/data/flights.json");
var airports           = require("../app/data/airports.json");
var flight             = require('../app/models/flight');
var airport            = require('../app/models/airport');
var booking            = require('../app/models/booking');
var bookings           = require("../app/data/bookings.json");

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
 * seed booking from data in booking.json if collection is empty
 */
exports.seedBookings = function seedBookings(cb){
    booking.count(function(err, count){
      console.log(count);
      if(count === 0)
        booking.create(bookings, function(err){
            cb(err, true);
        });
      else
          cb(err, false);
    });
}


/**
 * seed flights, airpors and bookings
 */
exports.seed = function seed(cb){
    var seedFlights = this.seedFlights;
    var seedBookings = this.seedBookings;
    this.seedAirports(function(err, check){
        if(err)
            cb(err,check);
        else{
            seedFlights(function(err, check){
              if(err)
                cb(err,check);
              else{
                seedBookings(function(err, check){
                  console.log("wasal wasal wasal");
                  cb(err , check);
                });
              }
            });
        }
    });
}
