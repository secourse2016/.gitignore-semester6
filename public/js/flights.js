var app=angular.module('austrianAirlinesApp');
app.factory('flights', [function(){
  var o = {
    outgoing: [
    	{dep: "10 AM",arr: "1PM", stops: 1, economy: 500, bussiness: 1000, flights: [{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"},{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"}]},
    	{dep: "10 AM",arr: "1PM", stops: 1, economy: 500, bussiness: 1000, flights: [{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"},{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"}]}
    ],
    ingoing: [
      {dep: "10 AM",arr: "1PM", stops: 1, economy: 500, bussiness: 1000, flights: [{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"},{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"}]},
      {dep: "10 AM",arr: "1PM", stops: 1, economy: 500, bussiness: 1000, flights: [{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"},{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"}]}

    ],
    indexOut: 0,
    ClassOut:0,
    indexIn: 0,
    classIn: 0
  };
  return o;
}]);

app.controller('FlightsCtrl', 

function($scope,flights){
  $scope.outgoingFlights = flights.outgoing;
  $scope.ingoingFlights = flights.ingoing;
  $scope.info = [];
  $scope.trans ={id: -1};
  console.log($scope.outgoingFlights.length);
  $scope.moveForward = function(){
    $scope.classOut=parseInt($scope.info[0].substring(0,1));
    $scope.classIn=parseInt($scope.info[1].substring(0,1));
    $scope.indexOut=parseInt($scope.info[0].substring(2));
    $scope.indexIn=parseInt($scope.info[1].substring(2));
   
    $scope.info=[];
  };
  
  

});