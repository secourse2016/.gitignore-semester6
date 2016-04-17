angular.module('austrianAirlinesApp').
controller('confirmationCtrl',function($scope,global,$location,$http){

	  // variable with value of the name of the airline
  $scope.airline          = "Austrian";

  // dates of departure and return
  var outgoingDate        = new Date(global.searchFlight.outgoingDate);
  var returnDate          = new Date(global.searchFlight.returnDate);
    
  // converting dates into string form
  $scope.departureDate    = outgoingDate.toDateString();
  $scope.arrivalDate      = returnDate.toDateString();

  // search flightt origin and destination
  $scope.origin           = global.searchFlight.origin;
  $scope.destination      = global.searchFlight.destination;

  // search flight class
  $scope.flightClass      = capitalize(global.searchFlight.flightClass);

  // search flight trip type
  $scope.tripType         = global.searchFlight.tripType;


  $scope.outgoingFlight  = angular.copy(global.outGoingTrip);
 
    // arrival time
    
  if($scope.tripType == 2){
    $scope.returnFlight    = angular.copy(global.returnTrip);
   
  }

	var infoFlow = $scope.infoFlow = global;
	$scope.step = 3; // View number in the stepper

	// all booking information in the global servrice which wile be passed to post request .
	var bookingInfo = {passengers:infoFlow.passengers,outgoingFlight:infoFlow.outGoingTrip.flightNumber,
	returnFlight:infoFlow.returnTrip.flightNumber,totalPrice:200}; //cost will be modified later .
	console.log(infoFlow.passengers);

	$scope.confirm = function(){
		/* after confirming the booking INFO redirect to the payment view */
		$http.post('/api/addBooking',bookingInfo).success(function(data){
			$location.path("/payment");
		})
		.error(function(data){
		/*if there is an err throw it otherWise go to payement page */
		console.log('Error: Couldn\'t insert in the dataBase.');
        });
		
	}

});





