var app = require('../app.js');
var assert = require('chai').assert;
var request = require('supertest');

describe('Airports API Route', function() {
    request = request(app);

    it('/api/airports should return an array of 6726 airports as JSON objects when I visit',
    function(done){
        var attributes = ["iata", "lon", "iso", "status", "continent", "type", "lat"];
        request.get('/api/airports').expect('Content-Type', /json/)
        .expect(function(res){
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

describe('Oneway Flights API Route', function() {
    request = request(app);

    it('it should return an array of flights from JFK to CAI on April 12, 2016 with economy class',
    function(done){
        request.get('/api/flights/search/JFK/CAI/1460478300000/economy').expect('Content-Type', /json/)
        .expect(function(res){
            var flights = res.body;
            assert.isArray(flights.outgoingFlights, "Returned object has an array of outgoing flights");
            for(var i = 0; i < flights.outgoingFlights.length; ++i){
                assert.equal(flights.outgoingFlights[i].origin != "JFK" || flights.outgoingFlights[i].destination != "CAI" || flights.outgoingFlights[i].class != "economy" || flights.outgoingFlights[i].departureDateTime != checkDate , true);
            }
        })
        .expect(200, done);
    });
});

describe('Round trip Flights API Route', function() {
    request = request(app);

    it('it should return an array of flights from JFK to CAI on April 12, 2016 with economy class and another one for return onApril 13, 2016',
    function(done){
        request.get('/api/flights/search/JFK/CAI/1460478300000/1460478400000/economy').expect('Content-Type', /json/)
        .expect(function(res){
            var flights = res.body;
            assert.isArray(flights.outgoingFlights, "Returned object has an array of outgoing flights");
            assert.isArray(flights.returnFlights, "Returned object has an array of return flights");
            for(var i = 0; i < flights.outgoingFlights.length; ++i){
                assert.equal(flights.outgoingFlights[i].origin != "JFK" || flights.outgoingFlights[i].destination != "CAI" || flights.outgoingFlights[i].class != "economy" || flights.outgoingFlights[i].departureDateTime != checkDate , true);
            }
             for(var i = 0; i < flights.returnFlights.length; ++i){
                assert.equal(flights.returnFlights[i].origin != "JFK" || flights.returnFlights[i].destination != "CAI" || flights.returnFlights[i].class != "economy" || flights.returnFlights[i].departureDateTime != checkDate , true);
            }
        })
        .expect(200, done);
    });
});
