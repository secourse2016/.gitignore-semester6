var app=angular.module('austrianAirlinesApp');
app.controller('flightsCtrl',

function($scope, flights, global, $location){
  $scope.origin=global.origin;
  $scope.destination=global.destination;
  $scope.tripType=global.tripType;
  $scope.outgoingFlights=flights.outgoingFlights;
  $scope.returnFlights=flights.returnFlights;
  $scope.info = [];
  $scope.trans = {id: -1};
  $scope.step = 1; //View number in the stepper
  $scope.moveForward = function(){
    global.outGoingTrip   = $scope.outgoingFlights($scope.info[0]);
    if ($scope.tripType == 2)
      global.returnTrip     = $scope.returnFlights($scope.info[1]);
    $scope.info = [];
    console.log(global);
    $location.path('/passengers');
  };
});
