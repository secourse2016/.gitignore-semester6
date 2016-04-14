var app = require('../app.js');
var assert = require('chai').assert;
var request = require('supertest');

// JWT Token Generation
var jwt = require('jsonwebtoken');
var token = jwt.sign({}, process.env.SECRET_KEY);

describe('Airports API Route', function() {
    request = request(app);

    it('/api/airports should return an array of 6726 airports as JSON objects when I visit',
    function(done){
        var attributes = ["iata", "lon", "iso", "status", "continent", "type", "lat"];
        request.get('/api/airports').set('x-access-token', token)
        .expect('Content-Type', /json/).expect(function(res){
            var airports = res.body;
            assert.isArray(airports, "Returned object is an array");
            assert.equal(airports.length, 6726, "Number of airports");
            for(var i = 0; i < airports.length; ++i){
                assert.isNotNull(airports[i], "No airport is null");
                for(var j = 0; j < attributes.length; ++j)
                    assert.isNotNull(airports[i][attributes[j]], "Airport "+airports[i]["iata"]+" has "+attributes[j]);
            }
        })
        .expect(200, done);
    });
});
