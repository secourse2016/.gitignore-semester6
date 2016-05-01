(function(){
	var app = angular.module('austrianAirlinesApp');

	/**
	* Images and texts used in the slides.
	*/
	var landingSlides = [
		{
			image: './assets/images/landing/landing_1.jpg',
			text : 'Feel the Comfort and Luxury.',
		},
		{
			image: './assets/images/landing/landing_2.jpg',
			text : 'Have Safe Flights.',
		},
		{
			image: './assets/images/landing/landing_3.jpg',
			text : 'High Technology Airplanes.',
		}
	];

	/**
	* Slider controller passes the slides content to the landing page view.
	*/
	app.controller('sliderController', function($scope){
		this.slides = landingSlides;
	});

	/**
	* Search Flight Controller form collecting form data
	* and redirecting to the flights view.
	*/
	app.controller('searchFlightController', function($scope, global, $location, $http, flights){
		this.range = [];
		for(var i = 2; i <= 7; ++i)
			this.range.push(i);
		$scope.formData = {tripType:2};
		$scope.errors = {};


		global.setOutGoingTrip(null);
		global.setReturnTrip(null);

		$scope.searchFlights = function(){

			global.setSearchFlight($scope.formData);

			// Send POST request to get the flights
			var origin 			= $scope.formData.origin;
			var destination 	= $scope.formData.destination;
			var outgoingDate	= $scope.formData.outgoingDate;
			var adults 				= $scope.formData.adults;
			var children			= $scope.formData.children;
			var returnDate		= $scope.formData.returnDate;
			var tripType		= $scope.formData.tripType;
			var allAirlines		= $scope.formData.allAirlines;
			var flightClass		= $scope.formData.flightClass;
			var validInput		= validateSearchFlights(origin, destination, outgoingDate,
												returnDate, flightClass, tripType, $scope);

			if(validInput){
				if($scope.formData.origin)
					$scope.formData.origin = origin = $scope.formData.origin.iata;
				if($scope.formData.destination)
					$scope.formData.destination = destination = $scope.formData.destination.iata;
				var requestParameters = {
					'origin' 		: origin,
					'destination'	: destination,
					'departureDate'	: outgoingDate,
					'flightClass'	: flightClass,
					'allAirlines'	: allAirlines,
					'numberOfPassengers' : parseInt(adults || 1) + parseInt(children || 0)
				}

				var postURL = 'api/flights/search/oneway';
				if(tripType == 2 && returnDate){
					requestParameters.arrivalDate = returnDate;
					postURL = 'api/flights/search/roundtrip';
				}

				$scope.hideSubmit = true;

				setTimeout(function(){
					$scope.loading = true;
					$http.post(postURL, requestParameters)
					.success(function(resultFlights){
						flights.outgoingFlights = resultFlights.outgoingFlights;
						if(tripType == 2)
							flights.returnFlights = resultFlights.returnFlights;
						$location.path("/flights");
					})
					.error(function(data){
						console.log('Error: Couldn\'t fetch flights.');
					});
				}, 1000);
			}
		};
	});


	function validateSearchFlights(origin, destination, outgoingDate, returnDate, flightClass, tripType){

		var valid = true;
		var today = new Date();
		today.setHours(0,0,0,0);

		if(!origin){
			valid = false;
			var message = 'Please select a valid origin airport.';
		}

		else if(!destination){
			valid = false;
			var message = 'Please select a valid destiation airport.';
		}
		else if(!outgoingDate){
			valid = false;
			var message = 'Please select your outgoing trip date.';
		}
		else if(Date.parse(outgoingDate) < today){
			valid = false;
			var message = 'You cannot travel back in time.';
		}
		else if(tripType == 2 && !returnDate){
			valid = false;
			var message = 'Please select your return trip date.';
		}
		else if(tripType == 2 && Date.parse(returnDate) < today)
		{
			valid = false;
			var message = 'You cannot travel back in time.';
		}
		else if(tripType == 2 && Date.parse(outgoingDate) >= Date.now() && Date.parse(returnDate) < Date.parse(outgoingDate))
		{
			valid = false;
			var message = 'Return date should be later than departure date.';
		}
		else if(!flightClass){
			valid = false;
			var message = 'Please select the trip class.';
		}

		if(!valid)
			Materialize.toast(message,3000);
		return valid;
	}

	/**
	 * Autocomplete (Typeahead) Controller for airport search.
	 */
	app.controller('autoCompleteController', function($http, $timeout, $q){
		var ctrl = this;
		ctrl.airports      = [];
		ctrl.searchText    = null;
		ctrl.querySearch   = querySearch;

		function querySearch(query){
			var results = query ? ctrl.airports.filter(createFilterFor(query) ) : [];
			return results;
		}

		function loadAll(airports) {
			return airports.map(function (airport) {
				var displayValue = (airport.name || "") + " (" + airport.iata + ")";
				return 	{
					iata: airport.iata,
					value: displayValue.toLowerCase(),
					display: displayValue
				};
			});
		}

		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			var uppercaseQuery = angular.uppercase(query);
			return function filterFn(airport) {
				return (airport.value.indexOf(lowercaseQuery) === 0
				|| airport.iata.indexOf(uppercaseQuery) === 0);
			};
		}

		$http.get('/api/airports')
		.success(function(data){
			ctrl.airports = loadAll(data);
		})
		.error(function(data){
			console.log('Error: can\'t fetch airports.');
		});
	});
})();
