angular.module('austrianAirlinesApp').service('bookingHistoryService', function() {

  // Object containing all booking details
  this.booking =
									{
										id:"1",
										passengers:
													[
														{
															firstName:"Mora",
															lastName:"B3gr",
															email:"mora@gmail.com",
															passportNumber:"123456",
															nationality:"7alawani",
															birthDate:"10/7/1995"
															}
														],

										outgoingFlight:
															{
																flightNumber      :  "55",
																aircraftType      :  'Boeing',
																aircraftModel     :   747,
																departureDateTime :  "03:30",
																arrivalDateTime   :  "04:05",
																origin            :  "CAI",
																destination       :  "BRL",
																cost              :  2000,
																currency          :  'USD',
																class             :  'economy',
																Airline           :  'Austrian'
															},

										returnFlight:
															{
																flightNumber      :  "55",
																aircraftType      :  'Boeing',
																aircraftModel     :   747,
																departureDateTime :  "03:30",
																arrivalDateTime   :  "04:05",
																origin            :  "BRL",
																destination       :  "CAI",
																cost              :  2000,
																currency          :  'USD',
																class             :  'economy',
																Airline           :  'Austrian'
															},

										totalPrice:4000 ,
										bookingDate:"10/4/2005" ,
										isSuccessful: true

									};

  // pass the booking object from the form controller to the service
  this.setBooking = function(booking){
    this.booking = booking;
  };

  // get the booking object from the service
  this.getBooking = function(){
    return this.booking;
  };

});
