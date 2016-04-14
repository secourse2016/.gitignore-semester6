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
	app.controller('searchFlightController', function($scope, global, $location){
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
			$location.path("/flights");
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
            	 console.log('Error: can\'t fetch airports');
        	});
	});

})();
