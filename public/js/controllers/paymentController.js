(function(){
	angular.module('austrianAirlinesApp')
	.controller('PaymentController', function($scope){
		this.booking = {}; // get all booking info from the global service
		this.totalPrice = 3000; // = booking.totalPrice
		$scope.step = 4; // View number in the stepper
		// Payment Form attributes
		this.cardNo = null;
		this.cvv = null;
		this.expiryDate = null;

		// Add the form inputs to the booking array
		this.addBooking = function(){
			this.booking.cardNo = this.cardNo;
			this.booking.cvv = this.cvv;
			this.booking.expiryDate = this.expiryDate;
			// insert booking into the dataBase
		};
	});
})();
