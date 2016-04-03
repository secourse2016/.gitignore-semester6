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

		$scope.formData = {};
		$scope.searchFlights = function(){
			global.setSearchFlight($scope.formData);
			$location.path("/flights");
		};
	});
})();
