angular.module('austrianAirlinesApp').
controller('bookingHistoryController',function($scope, bookingHistoryService){
	$scope.booking = bookingHistoryService.getBooking();
	if(!$scope.booking)
		$scope.notFound = true;
	else
		$scope.notFound = false;


	if($scope.booking){
		for(i = 0; i<$scope.booking.passengerDetails.length; i++) {
			$scope.booking.passengerDetails[i].dateOfBirth = new Date($scope.booking.passengerDetails[i].dateOfBirth);
			$scope.booking.passengerDetails[i].dateOfBirth = $scope.booking.passengerDetails[i].dateOfBirth.toDateString();
		}
		// variable with value of the name of the airline
	  $scope.airline          = "Austrian";

		if($scope.booking.returnFlightInfo)
	  	$scope.tripType = 2; // both airlines are austrian
		else
		$scope.tripType = 1; // One way trip, Or the outgoing flight is Austrian and the return is not.

		/**
		*	In case of the airline of the outgoing flight is not Austrian but the return flight is.
		*/
		if($scope.booking.returnFlightInfo && !$scope.booking.outgoingFlightInfo)
				$scope.tripType = 3;

	  // dates of departure and return
		if($scope.tripType != 3)
	  	var outgoingDate        = new Date($scope.booking.outgoingFlightInfo.departureDateTime);
		if($scope.tripType != 1)
	  	var returnDate          = new Date($scope.booking.returnFlightInfo.departureDateTime);

	  // converting dates into string form
		if($scope.tripType != 3)
	  	$scope.departureDate    = outgoingDate.toDateString();
		if($scope.tripType != 1)
		  $scope.arrivalDate    = returnDate.toDateString();

	  // search flightt origin and destination
		if($scope.tripType != 3){
	  	$scope.origin           = $scope.booking.outgoingFlightInfo.origin;
	  	$scope.destination      = $scope.booking.outgoingFlightInfo.destination;
		}
	  // search flight class
		if($scope.tripType != 3)
	  	$scope.flightClass      = capitalize($scope.booking.outgoingFlightInfo.class);

	  // search flight trip type

		if($scope.booking.returnFlightInfo)
	  	$scope.tripType = 2;
		else
			$scope.tripType = 1;

		if($scope.booking.returnFlightInfo && !$scope.booking.outgoingFlightInfo)
			$scope.tripType = 3;

		if($scope.tripType != 3){

			$scope.outgoingFlight  = angular.copy($scope.booking.outgoingFlightInfo);

			var departureTime      = new Date($scope.outgoingFlight.departureDateTime);
    	$scope.outgoingFlight.departureDateTime = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

    //arrival time
    	var arrivalTime                         = new Date($scope.outgoingFlight.arrivalDateTime);
    	$scope.outgoingFlight.arrivalDateTime   = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();
		}
	    // arrival time

	  if($scope.tripType != 1){
	    $scope.returnFlight    = angular.copy($scope.booking.returnFlightInfo);
			var departureTime  = new Date($scope.returnFlight.departureDateTime);
	    $scope.returnFlight.departureDateTime = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

	    //arrival time
	    var arrivalTime                       = new Date($scope.returnFlight.arrivalDateTime);
	    $scope.returnFlight.arrivalDateTime   = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();

	  }

	}

});
