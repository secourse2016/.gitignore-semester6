var app = require('../app.js');
var assert = require('chai').assert;
var request = require('supertest');

// JWT Token Generation
var jwt = require('jsonwebtoken');
var token = jwt.sign({}, process.env.SECRET_KEY);

describe('Airports API Route', function() {
    request = request(app);

    it('/api/airports should return an array of airports as JSON objects when I visit',
    function(done){
        request.get('/api/airports').set('x-access-token', token)
        .expect('Content-Type', /json/).expect(function(res){
            var airports = res.body;
            assert.isArray(airports, "Returned object is an array");
            for(var i = 0; i < airports.length; ++i){
                assert.isNotNull(airports[i], "No airport is null");
                assert.isNotNull(airports[i][attributes[j]], "Airport "+airports[i]["iata"]+" has IATA.");
            }
        })
        .expect(200, done);
    });
});

describe('Oneway Flights API Route', function() {
    //request = request(app);

    it('it should return an array of flights from JFK to CAI on April 12, 2016 with economy class',
    function(done){
        request.get('/api/flights/search/JFK/CAI/1460478300000/economy').expect('Content-Type', /json/)
        .expect(function(res){
            var flights = res.body;
            // check if the returned object has an array of outgoing flights
            assert.isArray(flights.outgoingFlights, "Returned object has an array of outgoing flights");
            // check if each returned flights has the same attributes as what we search about
            for(var i = 0; i < flights.outgoingFlights.length; ++i){
                assert.equal(flights.outgoingFlights[i].origin != "JFK" || flights.outgoingFlights[i].destination != "CAI" || flights.outgoingFlights[i].class != "economy" || flights.outgoingFlights[i].departureDateTime != checkDate , true);
            }
        })
        .expect(200, done);
    });
});

describe('Round trip Flights API Route', function() {
    //request = request(app);

    it('it should return an array of flights from JFK to CAI on April 12, 2016 with economy class and another one for return onApril 13, 2016',
    function(done){
        request.get('/api/flights/search/JFK/CAI/1460478300000/1460478400000/economy').expect('Content-Type', /json/)
        .expect(function(res){
            var flights = res.body;
            // check if the returned object has an array of outgoing flights
            assert.isArray(flights.outgoingFlights, "Returned object has an array of outgoing flights");
            // check if the returned object has an array of return flights
            assert.isArray(flights.returnFlights, "Returned object has an array of return flights");
            // check if each returned flights has the same attributes as what we search about
            for(var i = 0; i < flights.outgoingFlights.length; ++i){
                assert.equal(flights.outgoingFlights[i].origin != "JFK" || flights.outgoingFlights[i].destination != "CAI" || flights.outgoingFlights[i].class != "economy" || flights.outgoingFlights[i].departureDateTime != checkDate , true);
            }
             for(var i = 0; i < flights.returnFlights.length; ++i){
                assert.equal(flights.returnFlights[i].origin != "JFK" || flights.returnFlights[i].destination != "CAI" || flights.returnFlights[i].class != "economy" || flights.returnFlights[i].departureDateTime != checkDate , true);
            }

        }).expect(200, done);
    });
});




/**
*  Testing API search POST routes
*/
describe('API flights search POST route', function() {

    // test one-way route
    it('/api/flights/search/oneway POST should return a JSON object containing one array, outgoingFlights',
    function(done){
        // send request with a dummy flight
        request.post('/api/flights/search/oneway').set('x-access-token', token).send({
            'origin'        : 'CAI',
            'destination'   : 'JFK',
            'departureDate' : 1460478300000,
            'flightClass'   : 'economy',
            'allAirlines'   : false,
        }).expect('Content-Type', /json/)
        .expect(function(res){
            var flights = res.body;
            // check if JSON body contains an array of outgoing flights
            assert.isArray(flights.outgoingFlights, "Returned object is an array");
        })
        .expect(200, done);
    });

    // test round-trip route
    it('/api/flights/search/roundtrip POST should return a JSON object containing two arrays, outgoingFlights and returnFlights',
    function(done){
        // send reqest with dummy array
        request.post('/api/flights/search/roundtrip').set('x-access-token', token).send({
            'origin'        : 'CAI',
            'destination'   : 'JFK',
            'departureDate' : 1460478300000,
            'arrivalDate'   : 1460478300000,
            'flightClass'   : 'economy',
            'allAirlines'   : false,
        }).expect('Content-Type', /json/)
        .expect(function(res){
            var flights = res.body;
            // check if JSON body contains two arrays of outgoing and return flights
            assert.isArray(flights.outgoingFlights, "Returned object is an array");
            assert.isArray(flights.returnFlights, "Returned object is an array");

        })
        .expect(200, done);
    });
});
