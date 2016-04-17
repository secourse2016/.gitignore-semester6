var mongoose     = require('mongoose');
var schema       = mongoose.Schema;

var booking = new schema ({

	id : String,
	passengers :
		[
			{
				firstName : String,
				lastName : String,
				email : String,
				passportNumber : String,
				nationality : String,
				birthDate : Number
			}
		],
	outgoingFlight :{ type:String, ref: 'Flight' },

	returnFlight :{type:String , ref:'Flight'},

	totalPrice : Number,
	bookingDate : Number,
	isSuccessful : Boolean,
	isChild:Boolean
});

module.exports = mongoose.model('Booking', booking);
