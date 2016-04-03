angular.module('austrianAirlinesApp').service('global', function() {

	/**
	 * Information passed from the landing page to search for flights
	 * ==============================================================
	 * origin, destination 		[airport]
	 * adults, children 		[integer]
	 * tripType					[1 for one way, 2 for roundtrip]
	 * outgoingDate, returnDate	["date"]
	 * flightClass				["economy", :business]
	 */
	this.searchFlight = {};

	// A list of passengers whose info are entered by the user
	this.passengers = [];

	// the outgoing trip selected by the user
	this.outGoingTrip = {};
	
	// The return trip selected by the user
	this.returnTrip = {};

	/**
	 * Set the search flight information from the landing-page search form.
	 */
	 this.setSearchFlight = function(searchData){
		 this.searchFlight = searchData;
	 }

	/**
	* Set the passengers array
	*/
	this.setPassengers = function(passengersArr){
		this.passengers = passengersArr;
	}

	/**
	* Add a passenger to the passengers array
	*/
	this.addPassenger = function(passenger){
		this.passengers.push(passenger);
	}

	/**
	* Get a list of passengers in the service
	*/
	this.getPassengers = function(){
		return this.passengers;
	}

	/**
	* Set the outgoing trip to a list of flights (to handle transits)
	*/
	this.setOutGoingTrip = function(trip){
		this.outGoingTrip = trip;
	}

	/**
	* Get the list of flights of the outgoing trip
	*/
	this.getOutGoingTrip = function(){
		return this.outGoingTrip;
	}

	/**
	* Set the return trip to a list of flights
	*/
	this.setReturnTrip = function(trip){
		this.returnTrip = trip;
	}

	/**
	* get the list of flights of the return trip
	*/
	this.getReturnTrip = function(){
		return this.returnTrip;
	}
});
