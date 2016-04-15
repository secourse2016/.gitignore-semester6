(function(){
	angular.module('austrianAirlinesApp')
	.controller('historyFormController', ['$http' , function($http , bookingHistoryService){
		// Booking history form attributes
		this.request = {};
		var Ctrl = this;
    // Search the booking in the database
		this.searchBooking = function(){
			$http.post('/api/search-booking' , this.request).success(function(data){
				bookingHistoryService.setBooking(data);
			});
		};
	}]);
})();
