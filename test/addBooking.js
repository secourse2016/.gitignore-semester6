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
            emailAddress:"omarradwan213@gmail.com",
            passportNumber:12345678,
            nationality:"Egyptian",
            birthDate:10-7-1995
          }
        ];
     var bookingInfo = {
            passengers:passenger,
            outgoingFlight:2,
            returnFlight:5,
            totalCost:1400
          };
      var getBooking = flights.getBooking;
     flights.addBooking(bookingInfo , function(){
       // retrieve the inserted booking to get its bookingNumber and passportNumber
       booking.findOne({}, {}, {sort:{'bookingDate':-1}}, function(err, record){
         var bookingNumber = record.bookingNumber;
         var passportNumber = record.passengers[0].passportNumber;
         getBooking(bookingNumber, passportNumber, function(err, res){
           if(!err){
             // testing the passengers info
             for (var i = 0; i < res.passengers.length; i++) {
               assert.equal(res.passengers[i].firstName,bookingInfo.passengers[i].firstName,"firstNames are equal");
               assert.equal(res.passengers[i].lastName,bookingInfo.passengers[i].lastName,"lastNames are equal");
               assert.equal(res.passengers[i].emailAddress,bookingInfo.passengers[i].emailAddress,"Emails are equal");
               assert.equal(res.passengers[i].passportNumber,bookingInfo.passengers[i].passportNumber,"passportNumbers are equal");
               assert.equal(res.passengers[i].nationality,bookingInfo.passengers[i].nationality,"nationalities is equal");
             }
             // testing the rest of booking info
             assert.equal(res.totalCost,bookingInfo.totalCost,"totalPrices are equal");
             assert.equal(res.outgoingFlight,bookingInfo.outgoingFlight,"outgoing flights are equal");
             assert.equal(res.returnFlight,bookingInfo.returnFlight,"returnFlight are equal");
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
		var passenger = [{firstName:"mohamed",lastName:"khaled",emailAddress:"mohamed@gmail.com",passportNumber:212,nationality:"Egyptian",birthDate:30-4-1995}];
		var bookingInfo = {passengers:passenger,outgoingFlight:2,returnFlight:5,totalCost:200};
		/*calling booking function with dummy data */
		flights.addBooking(bookingInfo,function(){
			/*get the last record in the dataBase in the booking model and comparing it with the above one */
			booking.findOne({}, {}, { sort: { 'bookingDate' : -1 } }, function(err, record) {
				for (var i = 0; i < bookingInfo.passengers.length; i++) {
					/*checking if all passengers information are the same */
					assert.equal(record.passengers[i].firstName,bookingInfo.passengers[i].firstName,"firstNames are equal");
					assert.equal(record.passengers[i].lastName,bookingInfo.passengers[i].lastName,"lastNames are equal");
					//TODO: test is not working because of this assertion
					assert.equal(record.passengers[i].emailAddress, bookingInfo.passengers[i].emailAddress,"Emails are equal");
					assert.equal(record.passengers[i].passportNumber,bookingInfo.passengers[i].passportNumber,"passportNumbers are equal");
					assert.equal(record.passengers[i].nationality,bookingInfo.passengers[i].nationality,"nationalities is equal");
				}
				assert.equal(record.totalCost,bookingInfo.totalCost,"Total costs are equal");
				assert.equal(record.outgoingFlight,bookingInfo.outgoingFlight,"outgoing flights are equal");
				assert.equal(record.returnFlight,bookingInfo.returnFlight,"returnFlight are equal");
				done();
			});
		});
	});
});
