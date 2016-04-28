var app = angular.module('starter');

app.controller('passengerViewController' , function($scope, global) {

  $scope.departureDate    = "20th, April 2016";
	$scope.arrivalDate      = "21th, April 2016";
	$scope.origin           = "CAI";
	$scope.destination      = "JED";
	$scope.flightClass      = "Economy";
	$scope.tripType         = 2;
	$scope.outgoingFlight   = angular.copy(global.outGoingTrip);
  if($scope.tripType == 2)
		$scope.returnFlight = angular.copy(global.returnTrip);

});
