(function(){
	angular.module('austrianAirlinesApp')
	.controller('historyFormController',function($http ,$location , $scope, bookingHistoryService){
		// Booking history form attributes
		$scope.request = {};
    // Search the booking in the database
		$scope.searchBooking = function searchBooking(){
			if(validate($scope.request)){
				$http.post('/api/getBooking' , $scope.request).success(function(data){
						bookingHistoryService.setBooking(data);
						$location.path('/booking');
				});
			}
		};
	});

	 var validate = function(request){
		 	var valid = true;
			if(!request.bookingNumber){
				valid = false;
				var message = "please enter the booking number";
			}
			else if(!request.passportNumber){
					valid = false;
					var message = "please enter the passportNumber";
			}
			else if(request.passportNumber.length < 7){
				valid = false;
				var message = "Passport number should be more than 7 characters";
			}
			if(message)
				Materialize.toast(message , 3000);
			return valid;
	 };

})();
