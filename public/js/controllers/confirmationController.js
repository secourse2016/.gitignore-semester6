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
	if(infoFlow.returnTrip.cost)
		returnFlightCost = infoFlow.returnTrip.cost ;

	var totalCost = adultNumber*(outGoingTripCost+returnFlightCost)+childNumber*((outGoingTripCost+returnFlightCost)/2);

	global.setTotalCost(totalCost)

	// all booking information in the global servrice which wile be passed to post request .
	var bookingInfo = {passengers:infoFlow.passengers,outgoingFlight:infoFlow.outGoingTrip.flightNumber,
		totalCost:totalCost}; //cost will be modified later .
		if(infoFlow.returnTrip)
			bookingInfo.returnFlight = infoFlow.returnTrip.flightNumber;
		console.log(bookingInfo.passengers);

		/* after confirming the booking INFO redirect to the payment view */
		$scope.confirm = function(){

			/* Only insert to the database if the airline is Austrian
			 in either the outgoing or the return flight*/
			if(global.outGoingTrip.Airline == "Austrian" || (bookingInfo.returnFlight && global.returnTrip.Airline == "Austrian"))
			{
				$http.post('/api/addBooking',bookingInfo).success(function(data){
					global.setBookingNumber(data);
					$location.path("/payment");
				})
				.error(function(data){
					/*if there is an err throw it otherWise go to payement page */
					console.log('Error: Couldn\'t insert in the dataBase.');
				});
			}
			else
				$location.path("/payment");

		}
});
