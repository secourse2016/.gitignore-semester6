angular.module('austrianAirlinesApp').service('global', function() {
	// A list of passengers whose info are entered by the user
	this.passengers = [
	{"firstName" : 'Mohamed',
	"lastName" : 'Khale',
	"type" : 'Adult',
	"email" : 'mohamedkhly@gmail.com',
	"birthdate" : '30/4/1995',
	"passportNumber" : 'A13216548',
	"nationality" : 'Egyptian'},
	{"firstName" : 'Mostafa',
	"lastName" : 'Abdullah',
	"type" : 'Child',
	"email" : 'mostafaabdullahahmed@gmail.com',
	"birthdate" : '30/4/1995',
	"passportNumber" : 'A8791653',
	"nationality" : 'Egyptian'}
	];
 this.passengers = [];
	// the outgoing trip selected by the user
	this.outGoingTrip =
	{
		origin: 'CAI',
		destination : 'JKA',
		flights : [
			{
				airport : 'CAI',
				date : 'March 25',
				duration: '5 hours',
				class: 'Economy',
				seat : '23B'
			},
			{
				airport : 'Tegel',
				date : 'March 26',
				duration: '1 hour',
				class: 'Economy',
				seat : '22E'
			}
		]
	};

	// The return trip selected by the user
	this.returnTrip =
	{
		origin: 'JKA',
		destination : 'CAI',
		flights : [
			{
				airport : 'JKA',
				date : 'April 1',
				duration: '4 hours',
				class: 'Economy',
				seat : '23B'
			},
			{
				airport : 'Tegel',
				date : 'March 26',
				duration: '1 hour',
				class: 'Economy',
				seat : '22E'
			}
		]
	};


	/**
	* Set the passengers array
	*/
	this.setPassengers = function(passengersArr)
	{
		this.passengers = passengersArr;
	}

	/**
	* Add a passenger to the passengers array
	*/
	this.addPassenger = function(passenger)
	{
		this.passengers.push(passenger);
	}

	/**
	* Get a list of passengers in the service
	*/
	this.getPassengers = function()
	{
		return this.passengers;
	}

	/**
	* Set the outgoing trip to a list of flights (to handle transits)
	*/
	this.setOutGoingTrip = function(trip)
	{
		this.outGoingTrip = trip;
	}

	/**
	* Get the list of flights of the outgoing trip
	*/
	this.getOutGoingTrip = function()
	{
		return this.outGoingTrip;
	}

	/**
	* Set the return trip to a list of flights
	*/
	this.setReturnTrip = function(trip)
	{
		this.returnTrip = trip;
	}

	/**
	* get the list of flights of the return trip
	*/
	this.getReturnTrip = function()
	{
		return this.returnTrip;
	}




});
