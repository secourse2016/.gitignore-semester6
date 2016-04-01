angular.module('austrianAirlinesApp').
controller('flightController',['flightInfo',function(flightInfo){
	/* flightInfo is service that allow us to pass FlightInfo between different Controllers */
	this.getFlights = flightInfo.getFlightInfo();
	this.addFlight = function (currObj){flightInfo.addFlightInfo(currObj)};

	}])
		.controller('passengerController',['passengerInfo', function(passengerInfo){
			/*passengerInfo is service that allow us to pass passengerInfo between different Controllers */

				this.getPassengers = passengerInfo.getPassengerInfo();

				this.addPassenger = function (currObj){passengerInfo.addPassengerInfo(currObj)};



		}]);