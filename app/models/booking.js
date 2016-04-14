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
				birthDate : Date
			}
		],
	outgoingFlights :{ type:Number, ref: 'Flight' },		
			
	returnFlight :{type:Number , ref:'Flight'},
		
	totalPrice : Number,
	bookingDate : Date,
	isSuccessful : Boolean		
});

module.exports = mongoose.model('Booking', booking);