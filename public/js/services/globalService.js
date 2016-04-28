angular.module('austrianAirlinesApp').service('global', function() {

	/**
	 * searchFlight: Information passed from the landing page to search for flights
	 * ==============================================================
	 * origin, destination 		[airport IATA]
	 * adults, children 		[integer]
	 * tripType					[1 for one way, 2 for roundtrip]
	 * outgoingDate, returnDate	["date"]
	 * flightClass				["economy", "business"]
	 */
	this.searchFlight = {};

	this.totalCost = 0;
	this.bookingNumber = 0;
	this.passengers = [];
	this.outGoingTrip = null;
	this.returnTrip = null;

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
	* Set the outgoing trip to a list of flights (to handle transits).
	*/
	this.setOutGoingTrip = function(trip){
		this.outGoingTrip = trip;
	}

	/**
	* Get the list of flights of the outgoing trip.
	*/
	this.getOutGoingTrip = function(){
		return this.outGoingTrip;
	}

	/**
	* Set the return trip to a list of flights.
	*/
	this.setReturnTrip = function(trip){
		this.returnTrip = trip;
	}

	/**
	* get the list of flights of the return trip.
	*/
	this.getReturnTrip = function(){
		return this.returnTrip;
	}


	/**
	* Set the total cost of the booking
	*/
	this.setTotalCost = function(cost){
		this.totalCost = cost;
	}

	/**
	* get the total cost of the booking
	*/
	this.getTotalCost = function(){
		return this.totalCost;
	}


	/**
	* Set the total cost of the booking
	*/
	this.setBookingNumber = function(number){
		this.bookingNumber = number;
	}

	/**
	* get the total cost of the booking
	*/
	this.getBookingNumber = function(){
		return this.bookingNumber;
	}
});
