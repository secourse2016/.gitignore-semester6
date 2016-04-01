
angular.module('confirmationPage').service('passengerInfo', function() {
    this.passenger = [];

  this.addPassengerInfo = function(newObj) {
      this.passenger.push(newObj);
  };

  this.getPassengerInfo = function(){
      return this.passenger;
  };

});

