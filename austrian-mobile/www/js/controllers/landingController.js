(function(){
	var app = angular.module('starter');
	var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXN0cmlhbiBBaXJsaW5lcyIsImlhdCI6MTQ2MDYzNTE1OCwiZXhwIjoxNDkyMTcxMTU4LCJhdWQiOiJ3d3cuYXVzdHJpYW4tYWlybGluZXMuY29tIiwic3ViIjoiYXVzdHJpYW5BaXJsaW5lcyJ9.Dilu6siLX3ouLk48rNASpYJcJSwKDTFYS2U4Na1M5k4';
	var host = 'http://52.90.41.197:80';

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

			var origin 			= $scope.formData.origin;
			var destination 	= $scope.formData.destination;
			var outgoingDate	= $scope.formData.outgoingDate;
			var returnDate		= $scope.formData.returnDate;
			var tripType		= $scope.formData.tripType;
			var adults			= $scope.formData.adults;
			var children		= $scope.formData.children;
			var allAirlines		= $scope.formData.allAirlines;
			var flightClass		= $scope.formData.flightClass;
			$scope.error		= validateSearchFlights(origin, destination, outgoingDate,
												returnDate, flightClass, tripType, $scope);

			if(!$scope.error){
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
				};

				var postURL = host+'/api/flights/search/oneway?wt='+token;
				if(tripType == 2 && returnDate){
					requestParameters.arrivalDate = returnDate;
					postURL = host+'/api/flights/search/roundtrip?wt='+token;
				}

				$scope.loading = true;
				$http.post(postURL, requestParameters)
				.success(function(resultFlights){
					flights.outgoingFlights = resultFlights.outgoingFlights;
					if(tripType == 2)
						flights.returnFlights = resultFlights.returnFlights;
					$scope.loading = false;
					$state.go('flights');
				})
				.error(function(data){
					console.log('Error: Couldn\'t fetch flights.');
				});
			}
			setTimeout(function(){ $scope.error = null; }, 1000);
		};
	});


	function validateSearchFlights(origin, destination, outgoingDate, returnDate, flightClass, tripType){

		var today = new Date();
		today.setHours(0,0,0,0);

		if(!origin || !origin.iata)
			return 'Please select a valid origin airport.';

		if(!destination || !destination.iata)
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
		$http.get(host+'/api/airports?wt='+token)
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
