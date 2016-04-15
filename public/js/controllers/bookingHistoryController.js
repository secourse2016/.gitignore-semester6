angular.module('austrianAirlinesApp').
controller('bookingHistoryController',function($scope, bookingHistoryService){
	$scope.booking = bookingHistoryService.getBooking();
});
