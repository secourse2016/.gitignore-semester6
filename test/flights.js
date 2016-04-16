var assert  = require('chai').assert;
var app     = require('../app.js');
var request = require('supertest');
var flights = require('../flights.js');
var expect  = require('chai').expect;
var moment  = require('moment');

describe("getOneDirectionFlights", function() {
    it("should return all flights with origin as JFK and destination as ", function() {
    	var checked = true;
        // changing date inte timestamp format
    	var date = moment("April 12, 2016", "YYYY MM DD").format("x");
    	var checkDate = moment(date,"x").toDate().getTime;
        flights.getFlights(function(result){
            // check if the returned flights has the same attributes as we used for search
        	for (var i = 0; i < result.length; i++) {
        		if(result[i].origin != "JFK" || result[i].destination != "CAI" || result[i].class != "economy" || result[i].departureDateTime != checkDate){
        			checked = false;
        			break;
        		}
        	}

        }, "JFK", "CAI","economy", date);

        assert.equal(checked,true);
    });
});
    describe("getRoundTripFlights", function() {
    it("should return all flights with origin as JFK and destination as ", function() {
    	var checked = true;
        // changing date inte timestamp format
    	var departureDate = moment("April 12, 2016", "YYYY MM DD").format("x");
    	var arrivalDate = moment("April 12, 2016", "YYYY MM DD").format("x");
    	var checkDateDeparture = moment(departureDate,"x").toDate().getTime();
		var checkDateArrival = moment(arrivalDate,"x").toDate().getTime();
        flights.getFlights(function(result){
            // check if the returned flights has the same attributes as we used for search
        	for (var i = 0; i < result.outgoingFlights.length; i++) {
        		if(result[i].origin != "JFK" || result[i].destination != "CAI" || result[i].class != "economy" || result[i].departureDateTime != checkDateDeparture){
        			checked = false;
        			break;
        		}
        	}
        	for (var i = 0; i < result.outgoingFlights.length && checked == true; i++) {
        		if(result[i].origin != "CAI" || result[i].destination != "JFK" || result[i].class != "economy" || result[i].departureDateTime != checkDateArrival){
        			checked = false;
        			break;
        		}
        	}

        }, "JFK", "CAI","economy", departureDate, arrivalDate);

        assert.equal(checked,true);
    });
});