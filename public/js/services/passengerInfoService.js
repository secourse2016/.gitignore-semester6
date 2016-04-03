
angular.module('austrianAirlinesApp').service('passengerInfo', function() {
    this.passenger = [{"firstName" : 'mohamed',
 				   "lastName" : 'khaled',
    				"type" : 'Adult',
    				"Email" : 'mohamedkhly@gmail.com',
    				"birthdate" : '30-4-1995',
   					"passportNumber" : '22.22..2225',
   					"nationality" : 'Egyptian'},{"firstName" : 'mohamed',
 				   "lastName" : 'khaled',
    				"type" : 'child',
    				"Email" : 'mohamedkhly@gmail.com',
    				"birthdate" : '30-4-1995',
   					"passportNumber" : '22.22..2225',
   					"nationality" : 'Egyptian'}];

  this.addPassengerInfo = function(newObj) {
      this.passenger.push(newObj);
  };

  this.getPassengerInfo = function(){
      return this.passenger;
  };

});
