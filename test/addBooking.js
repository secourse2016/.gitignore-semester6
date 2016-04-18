var app = require('../app.js');
var assert = require('chai').assert;
var request = require('supertest');
var flights = require('../flights.js');
var flights = require('../flights.js');
var booking = require('../app/models/booking');

/*
** test for addBooking function in flights.js
*/
describe('addBooking function', function(){
	it('addBooking should insert the record in the dataBase',function(done){
		/* dummy data for booking */
		var passenger = [{firstName:"mohamed",lastName:"khaled",email:"mohamed@gmail.com",passportNumber:212,nationality:"Egyptian",birthDate:30-4-1995}];
		var bookingInfo = {passengers:passenger,outgoingFlight:2,returnFlight:5,totalPrice:200};
		/*calling booking function with dummy data */
		flights.addBooking(bookingInfo,function(){
			/*get the last record in the dataBase in the booking model and comparing it with the above one */
			booking.findOne({}, {}, { sort: { 'bookingDate' : -1 } }, function(err, record) {
				for (var i = 0; i < bookingInfo.passengers.length; i++) {
					/*checking if all passengers information are the same */
					assert.equal(record.passengers[i].firstName,bookingInfo.passengers[i].firstName,"firstNames are equal");
					assert.equal(record.passengers[i].lastName,bookingInfo.passengers[i].lastName,"lastNames are equal");
					//TODO: test is not working because of this assertion
					assert.equal(record.passengers[i].email, bookingInfo.passengers[i].email,"Emails are equal");
					assert.equal(record.passengers[i].passportNumber,bookingInfo.passengers[i].passportNumber,"passportNumbers are equal");
					assert.equal(record.passengers[i].nationality,bookingInfo.passengers[i].nationality,"nationalities is equal");
				}
				assert.equal(record.totalPrice,bookingInfo.totalPrice,"totalPrices are equal");
				assert.equal(record.outgoingFlight,bookingInfo.outgoingFlight,"outgoing flights are equal");
				assert.equal(record.returnFlight,bookingInfo.returnFlight,"returnFlight are equal");
				done();
			});
		});
	});
});
