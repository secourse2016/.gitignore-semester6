(function(){
	var app = angular.module('austrianAirlinesApp');

	/**
	 * Images and texts used in the slides.
	 * Increase slides, if needed.
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
	 * Slider controller passes the slides content to the landing-page view.
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
		$scope.searchFlights = function(){
			if($scope.formData.origin)
				$scope.formData.origin = $scope.formData.origin.iata;
			if($scope.formData.destination)
				$scope.formData.destination = $scope.formData.destination.iata;
			global.setSearchFlight($scope.formData);

			// send a post request to get the flights
			var origin 			= $scope.formData.origin;
			var destination 	= $scope.formData.destination;
			var outgoingDate	= $scope.formData.outgoingDate;
			var returnDate		= $scope.formData.returnDate;
			var tripType		= $scope.formData.tripType;
			var allAirlines		= $scope.formData.allAirlines;
			var flightClass		= $scope.formData.flightClass;

			var requestParameters = {
				'origin' 		: origin,
				'destination'	: destination,
				'departureDate'	: outgoingDate,
				'flightClass'	: flightClass,
				'allAirlines'	: allAirlines,
			}
			
			var postURL = 'api/flights/search/oneway';
			if(tripType == 2 && returnDate) {
				requestParameters.arrivalDate = returnDate;
				postURL = 'api/flights/search/roundtrip';
			}
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


			
		};
	});

	app.controller('autoCompleteController', function($http, $timeout, $q) {
		var ctrl = this;
		ctrl.airports      = [];
		ctrl.searchText    = null;
		ctrl.querySearch   = querySearch;

		function querySearch (query) {
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
		   return function filterFn(airport) {
			   return (airport.value.indexOf(lowercaseQuery) === 0
			   			|| airport.iata.indexOf(lowercaseQuery) === 0);
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
