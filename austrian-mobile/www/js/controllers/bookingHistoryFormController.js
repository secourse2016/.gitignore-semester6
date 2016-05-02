(function(){
	var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXN0cmlhbiBBaXJsaW5lcyIsImlhdCI6MTQ2MDYzNTE1OCwiZXhwIjoxNDkyMTcxMTU4LCJhdWQiOiJ3d3cuYXVzdHJpYW4tYWlybGluZXMuY29tIiwic3ViIjoiYXVzdHJpYW5BaXJsaW5lcyJ9.Dilu6siLX3ouLk48rNASpYJcJSwKDTFYS2U4Na1M5k4';
	var host = 'http://52.90.41.197:80';
	angular.module('starter')
	.controller('bookingHistoryFormController',function($http ,$state , $scope, bookingHistoryService){
		// Booking history form attributes
		$scope.request = {};
    	// Search the booking in the database
		$scope.searchBooking = function searchBooking(){
			$scope.error = validate($scope.request);
 			if(!$scope.error){
				$http.post(host+'/api/getBooking?wt='+token , $scope.request).success(function(data){
						bookingHistoryService.setBooking(data);
						$state.go('booking-history');
				});
			}
			setTimeout(function(){ $scope.error = null; }, 1000);
		};
	});

	var validate = function(request){
		if(!request.bookingNumber)
			return "please enter the booking number";
		if(!request.passportNumber)
			return "please enter the passportNumber";
		if(request.passportNumber.length < 7)
			return "Passport number should be more than 7 characters";
		return null;
	};

})();
