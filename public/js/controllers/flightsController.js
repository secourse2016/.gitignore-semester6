var app=angular.module('austrianAirlinesApp');

app.controller('flightsController', function($scope, flights, global, $location){

	$scope.airline          = "Austrian";

	var outgoingDate        = new Date(global.searchFlight.outgoingDate);
	var returnDate          = new Date(global.searchFlight.returnDate);
	$scope.departureDate    = outgoingDate.toDateString();
	$scope.arrivalDate      = returnDate.toDateString();

	$scope.origin           = global.searchFlight.origin;
	$scope.destination      = global.searchFlight.destination;
	$scope.flightClass      = capitalize(global.searchFlight.flightClass);
	$scope.tripType         = global.searchFlight.tripType;
	// $scope.outgoingFlights  = angular.copy(flights.outgoingFlights);
	// $scope.returnFlights    = angular.copy(flights.returnFlights);

	var allOutgoing  		= angular.copy(flights.outgoingFlights);
	var allReturn		    = angular.copy(flights.returnFlights);	


	// The number of flights, to be used in pagination
	$scope.numPages = {};
	$scope.numPages.outgoing 	= allOutgoing.length;
	$scope.numPages.return 		= allReturn.length;

	// Converting outgoing and return flights dates into form of hours and minutes
	for(i = 0; i < allOutgoing.length; i++){

		var departureTime                           = new Date(allOutgoing[i].departureDateTime);
		allOutgoing[i].departureDateTime = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

		var arrivalTime                             = new Date(allOutgoing[i].arrivalDateTime);
		allOutgoing[i].arrivalDateTime   = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();
	}

	for(i = 0; i < allReturn.length; i++){

		var departureTime                           = new Date(allReturn[i].departureDateTime);
		allReturn[i].departureDateTime   = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

		var arrivalTime                             = new Date(allReturn[i].arrivalDateTime);
		allReturn[i].arrivalDateTime     = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();
	}


	/**
	*	Change the page of the outgoing trips list
	*/
	$scope.changePageOutgoing = function(page) {
		
		for(entry = 0; entry < Math.min(5, allOutgoing.length - (page-1)*5); entry++) {
			$scope.outgoingFlights[entry] = allOutgoing[(page-1)*5 + entry];
		}
		if($scope.info[0])
			$scope.info[0] = null;
		// resize the scope if last page is less than 5 entries
		$scope.outgoingFlights.length = Math.min(5, allOutgoing.length - (page-1)*5);
	}

	$scope.info   = [];
	/**
	*	Change the page of the outgoing trips list
	*/
	$scope.changePageReturn = function(page) {
		
		for(entry = 0; entry<Math.min(5,allReturn.length - (page-1)*5); entry++) {
			$scope.returnFlights[entry] = allReturn[(page-1)*5 + entry];
		}
		if($scope.info[1])
			$scope.info[1] = null;
		// resize the scope if last page is less than 5 entries
		$scope.returnFlights.length = Math.min(5, allReturn.length - (page-1)*5);
	}

	$scope.outgoingFlights 	= new Array(Math.min(5,allOutgoing.length));
	$scope.returnFlights 	= new Array(Math.min(5,allReturn.length));

	// load the first page of flights
	$scope.changePageOutgoing(1);
	$scope.changePageReturn(1);
		

	// Array to store indexes of selected flights
	

	// Model to represent which flight to show its information
	$scope.trans  = {id: -1};

	$scope.step   = 1;


	// Function will be performed when submitting reserve button
	$scope.moveForward = function(){

		if(($scope.tripType==2 && $scope.outgoingFlights.length == 0 && $scope.returnFlights.length == 0)||
						($scope.tripType==1 && $scope.outgoingFlights.length == 0))
					Materialize.toast('There are no flights',3000);
				else
				if((!$scope.info[0] && $scope.outgoingFlights.length>0)||($scope.tripType == 2 && !$scope.info[1] && $scope.returnFlights.length > 0)) {
					Materialize.toast('Please select the flight.',3000);
				}
				else{
					
					if($scope.outgoingFlights.length == 0){
						// changing trip tipe when outgoing flights doesn't exist
						$scope.tmpSearch = angular.copy(global.searchFlight);
						global.searchFlight.tripType = 1;
						global.outGoingTrip = $scope.returnFlights[$scope.info[1]];
						global.origin = $scope.tmpSearch.destination;
						global.destination = $scope.tmpSearch.origin;
						global.outgoingDate = $scope.tmpSearch.returnDate;

					}else{
						
					// Passing selected outgoing flight to the global service
					global.outGoingTrip = $scope.outgoingFlights[$scope.info[0]];
					if ($scope.tripType == 2){
						// Passing selected return flight to the global service
						global.returnTrip = $scope.returnFlights[$scope.info[1]];
					}
					}

					 $location.path('/passengers');
				}

	};
});

/**
* Capitalize first letter in a string
*/
function capitalize(s){
	return s[0].toUpperCase() + s.slice(1);
}
