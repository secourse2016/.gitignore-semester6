angular.module('confirmationController').service('flightInfo',function(){


	this.flight = [];

	this.addFlightInfo = function(newObj){
		flight.push(newObj);


	};

	this.getFlightInfo = function(){
		return this.flight;

	};


});
