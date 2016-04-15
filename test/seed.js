// tests/quotes.js
var assert         = require('chai').assert;
var expect         = require('chai').expect;
var app            = require('../app.js');
var request        = require('supertest');
var seedDB           = require('../database/seed');
var clear          = require('../database/clear');
var flight         = require('../app/models/flight');
var airport        = require('../app/models/airport');




before(function(done){
    clear.clearDB(function(err){
        done();
    });
});

/**
 *	test seeding database with Airports
 */
describe('seedAirports',function(){
    var seedAirports = seedDB.seedAirports;
    it('should populate the db with Airports if db is empty returning true',function(done){
      seedAirports(function(err, seed){
        assert.isTrue(seed, 'Airports collection is empty');
        done();
      });
    });
    it('should have populated the Airports collection with 6726 Airport',function(done){
        airport.count(function(err, count){
          assert.strictEqual(6726,count,'database contains 6726 Airport');
          done();
      });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        seedAirports(function (err, seed){
          assert.isNotTrue(seed, 'db is full');
          done();
        });
    });
});
