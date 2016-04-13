var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var booking = new Schema ({

	passengers:
		[
			{
				first_name : string,
				last_name : string,
				email : string,
				passport_number : string,
				nationality : string,
				birth_date : date
			}
		],
	outgoing-flights:
		[
				Flight{

					flightNumber : integer
						
					  }
		],
	return-flights:
		[
				Flight{

					flightNumber : integer
					
					  }
		], 

	total_price : double,
	booking_date : date,
	is_successful : boolean		
});

module.exports = mongoose.model('Booking', booking);