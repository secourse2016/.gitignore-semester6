angular.module('austrianAirlinesApp')
	   .controller('confirmationController', function($scope, $http, global, $location){

	$scope.airline         = "Austrian";

	// dates of departure and return
	var outgoingDate       = new Date(global.searchFlight.outgoingDate);
	var returnDate         = new Date(global.searchFlight.returnDate);

	// converting dates into string form
	$scope.departureDate   = outgoingDate.toDateString();
	$scope.arrivalDate     = returnDate.toDateString();

	// search flightt origin and destination
	$scope.origin          = global.searchFlight.origin;
	$scope.destination     = global.searchFlight.destination;

	// search flight class
	$scope.flightClass     = capitalize(global.searchFlight.flightClass);

	// search flight trip type
	$scope.tripType        = global.searchFlight.tripType;


	$scope.outgoingFlight  = angular.copy(global.outGoingTrip);

	// arrival time

	if($scope.tripType == 2){
		$scope.returnFlight = angular.copy(global.returnTrip);

	}

	var infoFlow = $scope.infoFlow = global;
	$scope.step = 3; // View number in the stepper

	var adultNumber = 0;
	var childNumber = 0;
	for(var i = 0 ; i<infoFlow.passengers.length;i++){
		if(infoFlow.passengers[i].isChild == true)
			childNumber++;
		else
			adultNumber++;
	}

	var outGoingTripCost = infoFlow.outGoingTrip.cost ;
	var returnFlightCost = 0;
	if(infoFlow.returnTrip && infoFlow.returnTrip.cost)
		returnFlightCost = infoFlow.returnTrip.cost ;

	var totalCost = (adultNumber + childNumber)*(parseInt(outGoingTripCost)+parseInt(returnFlightCost));

	global.setTotalCost(totalCost)
	/* after confirming the booking INFO redirect to the payment view */
	$scope.confirm = function(){
		$location.path("/payment");
	}
});
