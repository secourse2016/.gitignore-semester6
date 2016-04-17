angular.module('austrianAirlinesApp').
controller('bookingHistoryController',function($scope, bookingHistoryService){
	$scope.booking = bookingHistoryService.getBooking();
	if(!$scope.booking)
		$scope.notFound = true;
	else
		$scope.notFound = false;



		// variable with value of the name of the airline
	  $scope.airline          = "Austrian";

		if($scope.booking.returnFlightInfo)
	  	$scope.tripType = 2;
		else
			$scope.tripType = 1;

	  // dates of departure and return
	  var outgoingDate        = new Date($scope.booking.outgoingFlightInfo.departureDateTime);
		if($scope.tripType == 2)
	  	var returnDate          = new Date($scope.booking.returnFlightInfo.departureDateTime);

	  // converting dates into string form
	  $scope.departureDate    = outgoingDate.toDateString();
		if($scope.tripType == 2)
		  $scope.arrivalDate      = returnDate.toDateString();

	  // search flightt origin and destination
	  $scope.origin           = $scope.booking.outgoingFlightInfo.origin;
	  $scope.destination      = $scope.booking.outgoingFlightInfo.destination;

	  // search flight class
	  $scope.flightClass      = capitalize($scope.booking.outgoingFlightInfo.class);

	  // search flight trip type

		if($scope.booking.returnFlightInfo)
	  	$scope.tripType = 2;
		else
			$scope.tripType = 1;



	  $scope.outgoingFlight  = angular.copy($scope.booking.outgoingFlightInfo);

		var departureTime                           = new Date($scope.outgoingFlight.departureDateTime);
    $scope.outgoingFlight.departureDateTime = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

    //arrival time
    var arrivalTime                             = new Date($scope.outgoingFlight.arrivalDateTime);
    $scope.outgoingFlight.arrivalDateTime   = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();

	    // arrival time

	  if($scope.tripType == 2){
	    $scope.returnFlight    = angular.copy($scope.booking.returnFlightInfo);
			var departureTime                           = new Date($scope.returnFlight.departureDateTime);
	    $scope.returnFlight.departureDateTime = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

	    //arrival time
	    var arrivalTime                             = new Date($scope.returnFlight.arrivalDateTime);
	    $scope.returnFlight.arrivalDateTime   = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();

	  }

});
