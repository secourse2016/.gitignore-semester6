/*
**Booking model contain all information of th booking passengers,booking price and booking flights reference
*/
var mongoose     = require('mongoose');
var schema       = mongoose.Schema;
var booking 	 = new schema ({

	bookingNumber	: {type:String ,unique:true},
	passengers 		:
		[
			{
				firstName 		: String,
				lastName 		: String,
				emailAdress 			: String,
				passportNumber 	: String,
				nationality 	: String,
				birthDate 		: Date,
				isChild 		: Boolean
			}
		],
	outgoingFlight 	: { type:String, ref: 'Flight' },	//reference id to the outGoingFlight number .
	totalCost		: Number,
	returnFlight 	: {type:String , ref:'Flight'}, // reference id to the returnFlight number .
	bookingDate		: Date, // booking date will be equal to the current date .
	isSuccessful	: Boolean // check if is booking is successful will be handelled after handelling stripe for payment
});

module.exports = mongoose.model('Booking', booking);
