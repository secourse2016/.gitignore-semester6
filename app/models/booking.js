var mongoose     = require('mongoose');
var schema       = mongoose.Schema;
var booking 	 = new schema ({

	bookingNumber :{type:String ,unique:true},
	passengers :
		[
			{
				firstName : String,
				lastName : String,
				email : String,
				passportNumber : String,
				nationality : String,
				birthDate : Date,
				isChild :Boolean
			}
		],
	outgoingFlight :{ type:String, ref: 'Flight' },		
			
	returnFlight :{type:String , ref:'Flight'},
	totalPrice : Number,
	bookingDate : Date,
	isSuccessful : Boolean		
});

module.exports = mongoose.model('Booking', booking);