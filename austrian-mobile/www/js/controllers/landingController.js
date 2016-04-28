(function(){
	var app = angular.module('starter');

	/**
	* Search Flight Controller form collecting form data
	* and redirecting to the flights view.
	*/
	app.controller('searchFlightController', function($scope, global, $state, $http, flights){

		this.range = [];
		for(var i = 2; i <= 7; ++i)
			this.range.push(i);

		$scope.formData = {};
		$scope.errors = {};

		$scope.searchFlights = function(){
			$scope.error = {};

			global.setSearchFlight($scope.formData);

			// Send POST request to get the flights
			var origin 			= $scope.formData.origin;
			var destination 	= $scope.formData.destination;
			var outgoingDate	= $scope.formData.outgoingDate;
			var returnDate		= $scope.formData.returnDate;
			var tripType		= $scope.formData.tripType;
			var allAirlines		= $scope.formData.allAirlines;
			var flightClass		= $scope.formData.flightClass;
			$scope.error		= validateSearchFlights(origin, destination, outgoingDate,
												returnDate, flightClass, tripType, $scope);

			if(!$scope.error){
				if($scope.formData.origin)
					origin = $scope.formData.origin.iata;
				if($scope.formData.destination)
					destination = $scope.formData.destination.iata;
				var requestParameters = {
					'origin' 		: origin,
					'destination'	: destination,
					'departureDate'	: outgoingDate,
					'flightClass'	: flightClass,
					'allAirlines'	: allAirlines,
				};

				var postURL = 'http://localhost:8080/api/flights/search/oneway';
				if(tripType == 2 && returnDate){
					requestParameters.arrivalDate = returnDate;
					postURL = 'http://localhost:8080/api/flights/search/roundtrip';
				}
				// TODO:: Add loading
				$http.post(postURL, requestParameters)
				.success(function(resultFlights){
					flights.outgoingFlights = resultFlights.outgoingFlights;
					if(tripType == 2)
						flights.returnFlights = resultFlights.returnFlights;
						$state.go('flights');
				})
				.error(function(data){
					console.log('Error: Couldn\'t fetch flights.');
				});
			}
		};
	});


	function validateSearchFlights(origin, destination, outgoingDate, returnDate, flightClass, tripType){

		var today = new Date();
		today.setHours(0,0,0,0);

		if(!origin)
			return 'Please select a valid origin airport.';

		if(!destination)
			return 'Please select a valid destiation airport.';


		if(!outgoingDate)
			return 'Please select your outgoing trip date.';

		if(Date.parse(outgoingDate) < today)
	 		return 'You cannot travel back in time.';

		if(tripType == 2 && !returnDate)
			return 'Please select your return trip date.';

		if(tripType == 2 && Date.parse(returnDate) < today)
			return 'You cannot travel back in time.';

		if(tripType == 2 && Date.parse(outgoingDate) >= Date.now() && Date.parse(returnDate) < Date.parse(outgoingDate))
			return 'Return date should be later than departure date.';

		if(!flightClass)
			return 'Please select the trip class.';
		return null;
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
		//TODO:: change this route to /api/airports
		$http.get('http://localhost:8080/api/airports')
		.success(function(data){
			ctrl.airports = loadAll(data);
		})
		.error(function(data){
			console.log('Error: can\'t fetch airports.');
		});
	});
})();

/* Date Field Styling */
function checkDateField(field) {
	if (field.value == '')
			return 'text';
	else
			return 'date';
}
