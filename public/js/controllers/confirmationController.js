angular.module('austrianAirlinesApp').
controller('confirmationCtrl',function($scope,global,$location,$http){
	
	var infoFlow = $scope.infoFlow = global;
	$scope.step = 3; // View number in the stepper

	// all booking information in the global servrice which wile be passed to post request .
	var bookingInfo = {passengers:infoFlow.passengers,outgoingFlight:infoFlow.outGoingTrip.flightNumber,
	returnFlight:infoFlow.returnTrip.flightNumber,totalPrice:200}; //cost will be modified later .

	$scope.confirm = function(){
		
		$http.post('/api/addBooking',bookingInfo).success(function(err,data){
			if(err)
				throw err ;
				
});
		$location.path("/payment");
		
}

});





