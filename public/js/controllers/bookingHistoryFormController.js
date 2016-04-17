(function(){
	angular.module('austrianAirlinesApp')
	.controller('historyFormController',function($http ,$location , $scope, bookingHistoryService){
		// Booking history form attributes
		$scope.request = {};

    // Search the booking in the database
		$scope.searchBooking = function searchBooking(){
			$http.post('/api/search-booking' , $scope.request).success(function(data){
				console.log(data);
				bookingHistoryService.setBooking(data);
				$location.path('/booking-history');
			});
		};
	});
})();
