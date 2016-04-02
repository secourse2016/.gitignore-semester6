var app = angular.module('austrianAirlinesApp');
app.controller('passengerViewCtrl' , function($scope, global){
  
  //for testing.
  $scope.passengers = [ {"type" : 'Adult'} , {"type" : 'Child'} ];
  //for filling it with passengers info .
  $scope.formData =[];

    // returnFlight and outGoingTrip from the service to be put in viwe . (Working)

    $scope.outgoingFlight = global.outGoingTrip;
    $scope.returnFlight = global.returnTrip;

    $scope.submitForm = function() {
      // set passengers Array in service with filled passengers info .
      global.setPassengers($scope.formData);
      // reinitialize .
      $scope.formData = [];

      // for testing (Working)
      // console.log(global.getPassengers());
    }
});
