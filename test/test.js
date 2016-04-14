var seed = require('../database/seed');
var assert = require('chai').assert;
var clear = require('../database/clear');
var flight             = require('../app/models/flight');
var airport            = require('../app/models/airport');




describe("clearDB", function() {
    // seed and then clear.
    seed.seed(function(err, check) {
      if(err) throw err;
      console.log(check);
      clear.clearDB(function(err){
        if(err) throw err;
      });
    });
    it("should clear flights and airports , find all empty", function() {
      var zero = true;
        airport.count(function(err, count){
            zero = zero & (count==0);
        });
        flight.count(function(err, count){
            zero = zero & (count==0);
        });
        assert.equal(zero,true);
    });
});
