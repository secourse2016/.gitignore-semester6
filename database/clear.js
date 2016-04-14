var flight             = require('../app/models/flight');
var airport            = require('../app/models/airport');

/**
 * remove airports from airport if the collection was not empty .
 */
 exports.removeAirports = function removeAirports(cb){
   airport.count(function(err,count){
     if(count == 0){
        cb(err,false);
    }
    else {
      airport.remove(function(err,removed){
        cb(err,removed);
      });
    }
  });
 }
