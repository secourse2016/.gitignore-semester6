angular.module('austrianAirlinesApp').service('flightInfo',function(){

	this.flight = [];
	
	this.addFlightInfo = function(newObj){
		this.flight.push(newObj);
	};

	this.getFlightInfo = function(){
		return this.flight;

	};


});