(function(){
	angular.module('starter')
	.controller('PaymentController', function($scope , global){
		$scope.totalCost = global.getTotalCost();
		$scope.currency = global.outGoingTrip.currency;
		$scope.step = 4; // View number in the stepper
		// Payment Form attributes
		$scope.cardNo = 0;
		$scope.cvv = 0;
		$scope.expiryDate = {};

		// Add the form inputs to the booking array
		$scope.addBooking = function(){
			$scope.booking.cardNo = this.cardNo;
			$scope.booking.cvv = this.cvv;
			$scope.booking.expiryDate = this.expiryDate;
			// insert booking into the dataBase
		};
	})
	.controller('successController' , function($scope , global){
		$scope.bookingNumber = global.getBookingNumber();
		/* check if Austrian is involved in any of the trips.
			 If not, show the other airline*/
		$scope.airline = "Austrian";
		if(global.getOutGoingTrip().Airline != "Austrian"){
			$scope.airline = global.getOutGoingTrip().Airline;
			if(global.getReturnTrip() && global.getReturnTrip().Airline == "Austrian"){
					$scope.airline = "Austrian";
			}
		}
	});
})();
