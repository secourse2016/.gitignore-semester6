angular.module('austrianAirlinesApp').
controller('flightController',['flightInfo',function(flightInfo){
	this.flight = flightInfo.getFlightInfo();


	}])
		.controller('passengerController',['passengerInfo', function(passengerInfo){

				this.getPassengers = passengerInfo.getPassengerInfo();

				this.addPassenger = function (currObj){passengerInfo.addPassengerInfo(currObj)};



		}])