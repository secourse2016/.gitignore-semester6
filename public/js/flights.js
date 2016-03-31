var app = angular.module('austrian', ['ui.router']);
app.factory('flights', [function(){
  var o = {
    outgoing: [
    	{dep: "10 AM",arr: "1PM", stops: 1, economy: 500, bussiness: 1000},
    	{dep: "10 AM",arr: "1PM", stops: 1, economy: 500, bussiness: 1000}
    ],
    ingoing: [
    	{dep: "10 AM",arr: "1PM", stops: 1, economy: 500, bussiness: 1000}
    ]
  };
  return o;
}]);

app.controller('FlightsCtrl', [
'$scope',
'flights',
function($scope,flights){
  $scope.outgoingFlights = flights.outgoing;
  $scope.ingoingFlights = flights.ingoing;

}]);