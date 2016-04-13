var app=angular.module('austrianAirlinesApp');
app.controller('flightsCtrl',

function($scope, flights, global, $location){
  $scope.booking=flights.booking;
  $scope.info = [];
  $scope.trans = {id: -1};
  $scope.step = 1; //View number in the stepper
  $scope.moveForward = function(){
    global.outGoingTrip.class   = parseInt($scope.info[0].substring(0,1));
    global.returnTrip.class     = parseInt($scope.info[1].substring(0,1));
    //set the class of the trips in the service
    if(global.outGoingTrip.class == 0)
      global.outGoingTrip.class = 'Economy';
    else
      global.outGoingTrip.class = 'Business';
    if(global.returnTrip.class == 0)
      global.returnTrip.class = 'Economy';
    else
      global.returnTrip.class = 'Business';

    global.outGoingTrip.flights = $scope.booking.outgoing_flights[parseInt($scope.info[0].substring(2))].flights;
    global.returnTrip.flights   = $scope.booking.ingoing_flights[parseInt($scope.info[1].substring(2))].flights;
    $scope.info = [];
    console.log(global);
    $location.path('/passengers');
  };
});
