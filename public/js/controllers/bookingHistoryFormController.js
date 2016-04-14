(function(){
	angular.module('austrianAirlinesApp')
	.controller('historyFormController', ['$http' , function($http , bookingHistoryService){
		// Booking history form attributes
		this.request = null;
		this.booking = null;
		var Ctrl = this;
    // Search the booking in the database
		this.searchBooking = function(){
			$http.post('/api/search-booking' , this.request).success(function(data){
				Ctrl.booking = data;
				bookingHistoryService.setBooking(data);
			});
		};
	}]);
})();
