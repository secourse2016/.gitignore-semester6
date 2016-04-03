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
				$scope.formData.origin = $scope.formData.origin.value;
			if($scope.formData.destination)
				$scope.formData.destination = $scope.formData.destination.value;
			global.setSearchFlight($scope.formData);
			$location.path("/flights");
		};
	});

	app.controller('autoCompleteController', function($timeout, $q) {
    this.airports      = loadAll();
    this.searchText    = null;
    this.querySearch   = querySearch;

    function querySearch (query) {
      var results = query ? this.airports.filter(createFilterFor(query) ) : [];
      return results;
    }

    function loadAll() {
		// var airports = AIRPORTS FROM SERVER
     	// var airportNames = [];
		// for(var i = 0; i < airports.length; ++i)
		// airportNames.push(airports[i]);
		var airportNames = ['Cairo International Airport (CIA)',
		'Minya International Airport (MIA)', 'Vnukovo International Airport (VKO)',
		'Chicago Meigs Airport (CGX)'
		];
	    return airportNames.map( function (airport) {
	    	return 	{
				          value: airport.toLowerCase(),
				          display: airport
	    			};
	      });
	}

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(airport) {
        return (airport.value.indexOf(lowercaseQuery) === 0);
      };
    }
  });

})();
