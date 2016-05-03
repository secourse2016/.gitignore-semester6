(function(){
	angular.module('austrianAirlinesApp')
	.controller('PaymentController', function($scope , global, $location, $http){
		$scope.totalCost = global.getTotalCost();
		$scope.currency = global.outGoingTrip.currency;
		$scope.step = 4; // View number in the stepper
		$scope.loading = false;

		/**
		*	Handle paying for the booking using stripe
		*/
		$scope.payForBooking = function(){

			var booking1 = {};
			var airline1 = {};

			var booking2 = null;
			var airline2 = null;

			// Add the booking details to the booking(s)
			booking1.passengerDetails 	= global.getPassengers();
			booking1.outgoingFlightId 	= global.getOutGoingTrip().flightId || global.getOutGoingTrip()._id;
			booking1.cost 				= global.getOutGoingTrip().cost;
			booking1.class				= global.getOutGoingTrip().class;
			airline1 = global.getOutGoingTrip().airline;

			if(global.getReturnTrip() && global.getOutGoingTrip().Airline != global.getReturnTrip().Airline) {
				booking2 = {};
				booking2.passengerDetails 	= global.getPassengers();
				booking2.outgoingFlightId 	= global.getReturnTrip().flightId || global.getReturnTrip()._id;
				booking2.cost 				= global.getReturnTrip().cost;
				booking2.class				= global.getReturnTrip().class;
				airline2 = global.getReturnTrip().airline;
			}
			else if(global.getReturnTrip()) {

				booking1.returnFlightId = global.getReturnTrip().flightId || global.getReturnTrip()._id;
				booking1.cost 			= parseInt(booking1.cost) + parseInt(global.getReturnTrip().cost);

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
				$scope.loading = true;
				var expiryDate = new Date($scope.expiryDate);

				// Get the entered credit card information
				var card = {
					number: $scope.cardNo,
					exp_month: (expiryDate.getMonth()+1),
					exp_year: expiryDate.getFullYear(),
					cvc : $scope.cvv
				}

				var IP1 = airline1.ip? airline1.ip : airline1.url;
				var IP2 = null;
				if(airline2)
					IP2 = airline2.ip? airline2.ip : airline2.url;

				
				// Get the publishable key of the involved airline in the outgoing flight
				getPublishableKey(IP1, $http, function(errKey, pubKey){
					if(!errKey && pubKey) {

						// Create the stripe token with the fetched key
						createStripeToken(pubKey, card, function(errStripe, token){
							if(errStripe) {
								$scope.loading = false;
								// The entered card information is invalid
								$scope.error.message = errStripe.message;
								if(errStripe.param == 'number')
									$scope.error.number = true;
								else if(errStripe.param == 'exp_month')
									$scope.error.date = true;
								else if(errStripe.param == 'exp_year')
									$scope.error.date = true;
								else if(errStripe.param == 'cvc')
									$scope.error.cvv = true;
								if(!$scope.$$phase)
									$scope.$apply();
							}
							else {

								// Card is valid
								booking1.paymentToken = token;
								var requestParameters = {};
								requestParameters.booking1 = booking1;
								requestParameters.airline1 = airline1;

								// Check if there is return trip from different airline
								if(airline2 && IP2) {
									// Two different airlines, generate another token.
									getPublishableKey(IP2, $http, function(errKey2, pubKey2){
										if(!errKey2 && pubKey2) {
											createStripeToken(pubKey2, card, function(errStripe2, token2){
												if(errStripe2) {
													$scope.loading = false;
												}
												else {
													booking2.paymentToken = token2;
													requestParameters.booking2 = booking2;
													requestParameters.airline2 = airline2;

													//Send http POST request with the two bookings
													console.log(requestParameters);
													sendBookingPOST(requestParameters, $http, function(err, data){
														$scope.loading = false;
														if(!err) {
															global.getOutGoingTrip().airline = data.airline1;
															global.getReturnTrip().airline = data.airline2;
															global.getOutGoingTrip().error1 = data.error1;
															global.getReturnTrip().error2 = data.error2;
															
														}
														else 
															global.getOutGoingTrip().error1 = err;
														$location.path('/complete');
														if(!$scope.$$phase)
															$scope.$apply();
													});
												}
											});
										}
										else {
											$scope.loading = false;
											// Couldn't fetch airline publishable key, DON'T BOOK
											global.getReturnTrip().error2 = 1;
											$location.path('/complete');
												if(!$scope.$$phase)
													$scope.$apply();
										}
									});
								}
								else {
									// One booking, send the HTTP request
									sendBookingPOST(requestParameters, $http, function(err, data){
										$scope.loading = false;
										if(!err) {
											global.getOutGoingTrip().airline = data.airline1;
											global.getOutGoingTrip().error1 = data.error1;

											
										}
										else
											global.getOutGoingTrip().error1 = err;
										$location.path('/complete');
										if(!$scope.$$phase)
											$scope.$apply();
									});
								}
							}
						});
					}
					else {
						$scope.loading = false;
						// Couldn't get the publishable key of the first airline. DON'T BOOK
						global.getOutGoingTrip().error1 = 1;
						$location.path('/complete');
							if(!$scope.$$phase)
								$scope.$apply();
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



/**
* Send a GET reqest to an airline to get its publishable key
*
*/
var getPublishableKey = function(IPaddress, $http, cb) {
	$http.get('http://'+IPaddress+'/stripe/pubkey')
		.success(function(key){
			if(key)
				cb(null, key)
			else
				cb(1,null);
		})
		.error(function(e){
			if(e){
				console.log('Error: couldn\'t fetch publishable key from '+IPaddress+'. '+e);
			}
			cb(e, null);
		});
}



/**
* Create a Stripe token with the fetched key
*/
var createStripeToken = function(pubKey, card, cb) {
	Stripe.setPublishableKey(pubKey);
	Stripe.card.createToken(card, function(status, response){
		Stripe.setPublishableKey("pk_test_GLghvbf0O1mNsV4T8nECOC1u");
		cb(response.error, response.id);
	});
}


/**
* Send POST request to process the booking
*/
var sendBookingPOST = function(requestParameters, $http, cb) {
	$http.post('/api/addBooking', requestParameters).success(function(data){
		cb(null, data);
	}).error(function(e){
		cb(e, null);
	});
}
