var app=angular.module('austrianAirlinesApp');
app.controller('FlightsCtrl', 

function($scope,flights){

  $scope.booking=flights.booking;
  $scope.info = [];
  $scope.trans ={id: -1};
  console.log($scope.booking.outgoing_flights[0].economy);
  $scope.moveForward = function(){
    $scope.booking.chosen_outgoing_flights.class=parseInt($scope.info[0].substring(0,1));
    $scope.booking.chosen_ingoing_flights.class=parseInt($scope.info[1].substring(0,1));
    $scope.booking.chosen_outgoing_flights.flights=$scope.booking.outgoing[parseInt($scope.info[0].substring(2))].f;
    $scope.booking.chosen_ingoing_flights.flights=$scope.booking.ingoing[parseInt($scope.info[1].substring(2))].f;
    if($scope.booking.chosen_outgoing_flights.class==1)
      $scope.booking.total_price=$scope.booking.outgoing[parseInt($scope.info[0].substring(2))].economy+$scope.booking.outgoing[parseInt($scope.info[1].substring(2))].economy;
    else
       $scope.booking.total_price=$scope.booking.outgoing[parseInt($scope.info[0].substring(2))].bussiness+$scope.booking.outgoing[parseInt($scope.info[1].substring(2))].bussiness; 
  $scope.info=[];
  };
 
});