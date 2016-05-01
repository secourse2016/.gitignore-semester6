(function(){
	angular.module('austrianAirlinesApp')
	.controller('PaymentController', function($scope , global, $location, $http){
		$scope.totalCost = global.getTotalCost();
		$scope.currency = global.outGoingTrip.currency;
		$scope.step = 4; // View number in the stepper


		/**
		*	Handle paying for the booking using stripe
		*/
		$scope.payForBooking = function(){

			var booking1 = {};
			var airline1 = {};

			var booking2 = null;
			var airline2 = null;

			// Add the booking details to the booking(s)
			booking1.passengerDetails = global.getPassengers();
			booking1.outgoingFlightId = global.getOutGoingTrip().flightId || global.getOutGoingTrip()._id;
			airline1 = global.getOutGoingTrip().airline;

			if(global.getReturnTrip() && global.getOutGoingTrip().Airline != global.getReturnTrip().Airline) {
				booking2 = {};
				booking2.passengerDetails = global.getPassengers();
				booking2.outgoingFlightId = global.getReturnTrip().flightId || global.getReturnTrip()._id;
				airline2 = global.getReturnTrip().airline;
			}
			else if(global.getReturnTrip()) {
				booking1.returnFlightId = global.getReturnTrip().flightId;
			}


			$scope.error = {};

			// Make sure that all payment fields are entered
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
						if(!$scope.$$phase)
							$scope.$apply();

					}
					else {
						booking1.paymentToken = response.id;

						var requestParameters = {};
						requestParameters.booking1 = booking1;
						requestParameters.airline1 = airline1;

						if(global.getReturnTrip() && global.getOutGoingTrip().Airline != global.getReturnTrip().Airline) {
							// Two different airlines, generate another token.
							Stripe.card.createToken(card, function(status2, responseToken2){
								if(responseToken2.error) {

								}
								else {
									booking2.paymentToken = responseToken2.id;

									requestParameters.booking2 = booking2;
									requestParameters.airline2 = airline2;
									// Send post request with two bookings
									$http.post('/api/addBooking',requestParameters).success(function(data){
										
										global.getOutGoingTrip().airline = data.airline1;
										global.getReturnTrip().airline = data.airline2;
										global.getOutGoingTrip().error1 = data.error1;
										global.getReturnTrip().error2 = data.error2;
										$location.path('/complete');
										if(!$scope.$$phase)
											$scope.$apply();
									})
									.error(function(data){
										/*if there is an err throw it otherWise go to payement page */
										console.log('Error: Couldn\'t insert in the dataBase.');
									});


								}
							});
						}
						else {

							// Send post request with one booking.
							$http.post('/api/addBooking',requestParameters).success(function(data){
								global.getOutGoingTrip().airline = data.airline1;
								global.getOutGoingTrip().error1 = data.error1;

								$location.path('/complete');
								if(!$scope.$$phase)
									$scope.$apply();
							})
							.error(function(data){
								/*if there is an err throw it otherWise go to payement page */
								console.log('Error: Couldn\'t insert in the dataBase.');
							});

						}


					}

				});
			}

		};
	})
	.controller('successController' , function($scope , global){
		
		$scope.error = {};
		$scope.error.error1 = global.getOutGoingTrip().error1;
			
		$scope.airline1 = global.getOutGoingTrip().airline;

		if(global.getReturnTrip()){
			$scope.airline2 = global.getReturnTrip().airline;
			$scope.error.error2 = global.getReturnTrip().error2;
		}

	});
})();
