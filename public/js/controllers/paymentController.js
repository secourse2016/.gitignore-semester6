(function(){
	angular.module('austrianAirlinesApp')
	.controller('PaymentController', function($scope , global, $location){
		$scope.totalCost = global.getTotalCost();
		$scope.currency = global.outGoingTrip.currency;
		$scope.step = 4; // View number in the stepper
		
	
		/**
		*	Handle paying for the booking using stripe
		*/
		$scope.payForBooking = function(){
			$scope.error = {};

			// Make sure that all fields are entered
			var errored = false;
			if(!$scope.cardNo) {
				$scope.error.number = true;
				errored = true;
			}
			if(!$scope.cvv) {
				$scope.error.cvv = true;
				errored = true;
			}
			if(!$scope.expiryDate) {
				$scope.error.date = true;
				errored = true;
			}
			if(errored)
				$scope.error.message = 'This field is required.';
			else {
				var expiryDate = new Date($scope.expiryDate);

				// Get the entered credit card information
				var card = {
					number: $scope.cardNo,
					exp_month: (expiryDate.getMonth()+1),
					exp_year: expiryDate.getFullYear(),
					cvc : $scope.cvv
				}
				
				// Create the stripe token
				Stripe.card.createToken(card, function(status,response){
					
					// Display the error message in the view in the appropriate place
					if(response.error){

						
						$scope.error.message = response.error.message;

						if(response.error.param == 'number')
							$scope.error.number = true;
						else if(response.error.param == 'exp_month')
							$scope.error.date = true;
						else if(response.error.param == 'exp_year')
							$scope.error.date = true;
						else if(response.error.param == 'cvc')
							$scope.error.cvv = true;

						$scope.$apply();	
					
					}
					else {
						// TODO will send the booking details to the server here.


						$location.path('/successful');
					}

				});
			}
			
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
