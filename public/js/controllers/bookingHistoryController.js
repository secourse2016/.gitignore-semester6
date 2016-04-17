angular.module('austrianAirlinesApp').
controller('bookingHistoryController',function($scope, bookingHistoryService){
	$scope.booking = bookingHistoryService.getBooking();
	if(!$scope.booking)
		$scope.notFound = true;
	else
		$scope.notFound = false;

});
