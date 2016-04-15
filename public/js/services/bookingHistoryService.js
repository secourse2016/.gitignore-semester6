angular.module('austrianAirlinesApp').service('bookingHistoryService', function() {

  // Object containing all booking details
  this.booking = {};

  // pass the booking object from the form controller to the service
  this.setBooking = function(booking){
    this.booking = booking;
  };

  // get the booking object from the service
  this.getBooking = function(){
    return this.booking;
  };

});
