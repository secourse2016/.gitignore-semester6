(function(){
	angular.module('austrianAirlinesApp')
	.controller('PaymentController', function($scope , global){
		$scope.totalCost = global.getTotalCost();
		$scope.currency = global.outGoingTrip.currency;
		$scope.step = 4; // View number in the stepper
		// Payment Form attributes
		$scope.cardNo = 0;
		$scope.cvv = 0;
		$scope.expiryDate = {};

		// Add the form inputs to the booking array
		this.addBooking = function(){
			this.booking.cardNo = this.cardNo;
			this.booking.cvv = this.cvv;
			this.booking.expiryDate = this.expiryDate;
			// insert booking into the dataBase
		};
	})
	.controller('successController' , function($scope , global){
		$scope.bookingNumber = global.getBookingNumber();
		$scope.airline = global.getOutGoingTrip().Airline;
	});
})();
