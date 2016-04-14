var airport = require('./app/models/airport');

var getAirports = module.exports = function(cb){
    airport.find(function(err, airports){
        cb(err, airports);
    });
};
