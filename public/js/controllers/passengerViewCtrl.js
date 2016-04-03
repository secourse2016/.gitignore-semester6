var app = angular.module('austrianAirlinesApp');
app.controller('passengerViewCtrl' , function($scope, global, $location){

  //for testing.
  $scope.passengers = [{type : 'Adult'},{type:'Child'} ];
  //for filling it with passengers info .
  $scope.formData =[];

    // Get all information from the global service, to be used in the view

      $scope.infoFlow = global;
  
      $scope.adults = new Array(global.searchFlight.adults);
      $scope.children = new Array(global.searchFlight.children);
      
      $scope.submitForm = function() {
      // set passengers Array in service with filled passengers info .
      global.setPassengers($scope.formData);
      $location.path('/confirmation');

      // for testing (Working)
      // console.log(global.getPassengers());
    }
});
