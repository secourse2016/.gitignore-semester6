var Airports           = require("./airports.json")
var Flight             = require('../app/models/flight');
var Airport            = require('../app/models/airport');

exports.seedAirports = function seedAirports(cb){
    Airport.collection.count( function ( err , c) { //check thier count
      if(c == 0)
        Airport.collection.insert(Airports, function(err, result) {cb(err,true)});
      else
          cb(err, false);
    });
}
