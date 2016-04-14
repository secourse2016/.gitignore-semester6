var airport = require('./app/models/airport');

module.exports.getAirports = function(cb){
    airport.find(function(err, airports){
        cb(err, airports);
    });
};
