var app = require('../app.js');
var assert = require('chai').assert;
var request = require('supertest');
var flights = require('../flights.js');
var booking = require('../app/models/booking');

/*
** test for addBooking function in flights.js
*/

 describe('getBooking function' , function(){
   it('getBooking should retrieve a certain booking from dataase' , function(done){
     // insert a dummy booking into the database
     var passenger = [
            {firstName:"Omar",
            lastName:"Radwan",
            email:"omarradwan213@gmail.com",
            passportNum:12345678,
            nationality:"Egyptian",
            dateOfBirth:10-7-1995
          }
        ];
     var bookingInfo = {
            passengerDetails:passenger,
            outgoingFlightId:2,
            returnFlightId:5,
            cost:1400
          };
      var getBooking = flights.getBooking;
     flights.addBooking(bookingInfo , function(){
       // retrieve the inserted booking to get its bookingNumber and passportNumber
       booking.findOne({}, {}, {sort:{'bookingDate':-1}}, function(err, record){
         var bookingNumber = record.bookingNumber;
         var passportNumber = record.passengerDetails[0].passportNum;
         getBooking(bookingNumber, passportNumber, function(err, res){
           if(!err){
             // testing the passengers info
             for (var i = 0; i < res.passengerDetails.length; i++) {
               assert.equal(res.passengerDetails[i].firstName,bookingInfo.passengerDetails[i].firstName,"firstNames are equal");
               assert.equal(res.passengerDetails[i].lastName,bookingInfo.passengerDetails[i].lastName,"lastNames are equal");
               assert.equal(res.passengerDetails[i].email,bookingInfo.passengerDetails[i].email,"Emails are equal");
               assert.equal(res.passengerDetails[i].passportNum,bookingInfo.passengerDetails[i].passportNum,"passportNumbers are equal");
               assert.equal(res.passengerDetails[i].nationality,bookingInfo.passengerDetails[i].nationality,"nationalities is equal");
             }
             // testing the rest of booking info
             assert.equal(res.cost,bookingInfo.cost,"totalPrices are equal");
             assert.equal(res.outgoingFlightId,bookingInfo.outgoingFlightId,"outgoing flights are equal");
             assert.equal(res.returnFlightId,bookingInfo.returnFlightId,"returnFlight are equal");
             done();
           }
         });
       });
     });
   });
 });

describe('addBooking function', function(){
	it('addBooking should insert the record in the dataBase',function(done){
		/* dummy data for booking */
		var passenger = [{firstName:"mohamed",lastName:"khaled",email:"mohamed@gmail.com",passportNum:212,nationality:"Egyptian",dateOfBirth:30-4-1995}];
		var bookingInfo = {passengerDetails:passenger,outgoingFlightId:2,returnFlightId:5,cost:200};
		/*calling booking function with dummy data */
		flights.addBooking(bookingInfo,function(){
			/*get the last record in the dataBase in the booking model and comparing it with the above one */
			booking.findOne({}, {}, { sort: { 'bookingDate' : -1 } }, function(err, record) {
				for (var i = 0; i < bookingInfo.passengers.length; i++) {
					/*checking if all passengers information are the same */
					assert.equal(record.passengerDetails[i].firstName,bookingInfo.passengerDetails[i].firstName,"firstNames are equal");
					assert.equal(record.passengerDetails[i].lastName,bookingInfo.passengerDetails[i].lastName,"lastNames are equal");
					//TODO: test is not working because of this assertion
					assert.equal(record.passengerDetails[i].email, bookingInfo.passengerDetails[i].email,"Emails are equal");
					assert.equal(record.passengerDetails[i].passportNum,bookingInfo.passengerDetails[i].passportNum,"passportNumbers are equal");
					assert.equal(record.passengerDetails[i].nationality,bookingInfo.passengerDetails[i].nationality,"nationalities is equal");
				}
				assert.equal(record.cost,bookingInfo.cost,"Total costs are equal");
				assert.equal(record.outgoingFlightId,bookingInfo.outgoingFlightId,"outgoing flights are equal");
				assert.equal(record.returnFlightId,bookingInfo.returnFlightId,"returnFlight are equal");
				done();
			});
		});
	});
});
