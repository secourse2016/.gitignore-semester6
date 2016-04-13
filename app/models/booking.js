var mongoose     = require('mongoose');
var schema       = mongoose.Schema;

var booking = new schema ({

	id : String,
	passengers :
		[
			{
				first_name : String,
				last_name : String,
				email : String,
				passport_number : String,
				nationality : String,
				birth_date : Date
			}
		],
	outgoing_flights :{ type:Number, ref: 'Flight' },		
			
	return_flights :{type:Number , ref:'Flight'},
		
	total_price : Number,
	booking_date : Date,
	is_successful : Boolean		
});

module.exports = mongoose.model('Booking', booking);