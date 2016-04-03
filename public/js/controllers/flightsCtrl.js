var app=angular.module('austrianAirlinesApp');
app.controller('flightsCtrl', 

function($scope,flights,global,$location){

  $scope.booking=flights.booking;
  $scope.info = [];
  $scope.trans ={id: -1};
  $scope.moveForward = function(){
    global.outGoingTrip.class=parseInt($scope.info[0].substring(0,1));
    global.returnTrip.class=parseInt($scope.info[1].substring(0,1));
    global.outGoingTrip.flights=$scope.booking.outgoing_flights[parseInt($scope.info[0].substring(2))].flights;
    global.returnTrip.flights=$scope.booking.ingoing_flights[parseInt($scope.info[1].substring(2))].flights;
  $scope.info=[];
  $location.path('/passengers');

  };
 
});