angular.module('austrianAirlinesApp').
controller('confirmationCtrl',function($scope,global, $location,$http){
	
	$scope.infoFlow = global;
	$scope.step = 3; // View number in the stepper
	var bookingInfo = {passengers:intoFlow.passengers,outgoingFlights:intoFlow.outgoingFlights.flightNumber,
		returnFlights:intoFlow.returnFlights.flightNumber,cost:infoFlow.bookingCost};

	$scope.confirm = function(){

	$http.post('/api/addBooking',bookingInfo).success(function(data){
	console.log('booking successful');

});
		//$location.path("/payment");
	}
	




});
