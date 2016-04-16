var seed = require('../database/seed');
var assert = require('chai').assert;
var clear = require('../database/clear');
var flight             = require('../app/models/flight');
var airport            = require('../app/models/airport');
var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongoURL);

// seed before testing clearing the database.
before(function(done){
  // seeding the database takes large time.
  this.timeout(7000);

    seed.seed(function(err,seeded){
        done();
    });
});

// testing clearDB function.
describe("clearDB", function() {

    it("should clear flights and airports , find all empty", function(done) {
      clear.clearDB(function(err){
        // boolean flag to indicate that database is empty by counting flights and airports.
        var zero = true;
          // count the number of airports after clearing the database.
          airport.count(function(err, count){
              zero = zero & (count==0);
              // count the number of flights after clearing the database.
              flight.count(function(err, count){
                  zero = zero & (count==0);
                  assert.equal(zero,true);
                  done();
              });
          });
      });
    });
});
