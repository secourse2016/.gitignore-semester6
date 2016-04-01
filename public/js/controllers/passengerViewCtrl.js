var passengerViewApp = angular.module('passengerViewApp' , []);
passengerViewApp.controller('passengerViewCtrl' , function($scope){
  //for testing.
  $scope.passengers = [   {"type" : 'Adult'}  , {"type" : 'Child'} ];
    // to be filled.
    $scope.formData =[];
});
