angular.module('austrianAirlinesApp').
controller('confirmationCtrl',function($scope,global, $location){
	
	$scope.outGoingTrip = global.getOutGoingTrip();
	$scope.returnTrip = global.getReturnTrip();
	$scope.passengers = global.getPassengers();
	$scope.confirm = function()
	{
		$location.path("/payment");
	}

});
