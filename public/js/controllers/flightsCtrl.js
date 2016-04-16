var app=angular.module('austrianAirlinesApp');
app.controller('flightsCtrl',

function($scope, flights, global, $location){
  $scope.airline = "Austrian";
  $scope.departureDate = global.searchFlight.outgoingDate;
  var departureDate = new Date($scope.departureDate);
  $scope.departureDate = departureDate.getUTCDate()+"-"+departureDate.getUTCMonth()+"-"+departureDate.getFullYear();
  $scope.arrivalDate = global.searchFlight.returnDate;
  var arrivalDate = new Date($scope.arrivalDate);
  $scope.arrivalDate = arrivalDate.getUTCDate()+"-"+arrivalDate.getUTCMonth()+"-"+arrivalDate.getFullYear();
  $scope.origin=global.searchFlight.origin;
  $scope.destination=global.searchFlight.destination;
  $scope.tripType=global.searchFlight.tripType;
  $scope.outgoingFlights=flights.outgoingFlights;
   $scope.returnFlights=flights.returnFlights;
  for(i = 0; i < $scope.outgoingFlights.length; i++)
  {
    var departureTime = new Date($scope.outgoingFlights[i].departureDateTime);
    $scope.outgoingFlights[i].departureDateTime = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

    var arrivalTime = new Date($scope.outgoingFlights[i].arrivalDateTime);
    $scope.outgoingFlights[i].arrivalDateTime = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();
  }

  for(i = 0; i < $scope.returnFlights.length; i++)
  {
    var departureTime = new Date($scope.returnFlights[i].departureDateTime);
    $scope.returnFlights[i].departureDateTime = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

    var arrivalTime = new Date($scope.returnFlights[i].arrivalDateTime);
    $scope.returnFlights[i].arrivalDateTime = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();
  }
  

  $scope.returnFlights=flights.returnFlights;
  $scope.info = [];
  $scope.trans = {id: -1};
  $scope.step = 1; //View number in the stepper
  $scope.moveForward = function(){
    global.outGoingTrip   = $scope.outgoingFlights[$scope.info[0]];
    if ($scope.tripType == 2)
      global.returnTrip     = $scope.returnFlights[$scope.info[1]];
    $scope.info = [];
    console.log(global);
    $location.path('/passengers');
  };
});
