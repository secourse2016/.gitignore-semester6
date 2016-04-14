angular.module('austrianAirlinesApp').
controller('bookingHistoryController',function($scope, bookingHistoryService){
	$scope.infoFlow = bookingHistoryService;
});
