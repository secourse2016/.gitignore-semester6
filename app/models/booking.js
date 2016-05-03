/*
**Booking model contain all information of th booking passengers,booking price and booking flights reference
*/
var mongoose     = require('mongoose');
var schema       = mongoose.Schema;
var booking 	 = new schema ({

	bookingNumber	: {type:String ,unique:true},
	passengerDetails	:
		[
			{
				firstName 		: String,
				lastName 		: String,
				email		 	: String,
				passportNum 	: String,
				nationality 	: String,
				dateOfBirth 	: Number,
				isChild 		: Boolean,
				seat			: String
			}
		],
	outgoingFlightId 	: { type:String, ref: 'Flight' },	//reference id to the outGoingFlight number .
	cost 				: Number,
	returnFlightId 		: {type:String , ref:'Flight'}, // reference id to the returnFlight number .
	bookingDate			: Date, // booking date will be equal to the current date .

});

module.exports = mongoose.model('Booking', booking);
