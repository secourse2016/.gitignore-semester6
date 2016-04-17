var app=angular.module('austrianAirlinesApp');
app.controller('flightsCtrl', function($scope, flights, global, $location){

  // variable with value of the name of the airline
  $scope.airline          = "Austrian";


  // dates of departure and return
  var outgoingDate        = new Date(global.searchFlight.outgoingDate);
  var returnDate          = new Date(global.searchFlight.returnDate);

  // converting dates into string form
  $scope.departureDate    = outgoingDate.toDateString();
  $scope.arrivalDate      = returnDate.toDateString();

  // search flightt origin and destination
  $scope.origin           = global.searchFlight.origin;
  $scope.destination      = global.searchFlight.destination;

  // search flight class
  $scope.flightClass      = capitalize(global.searchFlight.flightClass);

  // search flight trip type
  $scope.tripType         = global.searchFlight.tripType;

  // copy of result outgoing and return flights
  $scope.outgoingFlights  = angular.copy(flights.outgoingFlights);
  $scope.returnFlights    = angular.copy(flights.returnFlights);

  // converting outgoing flights dated into form of hours and minutes
  for(i = 0; i < $scope.outgoingFlights.length; i++){
    // departure time
    var departureTime                           = new Date($scope.outgoingFlights[i].departureDateTime);
    $scope.outgoingFlights[i].departureDateTime = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

    //arrival time
    var arrivalTime                             = new Date($scope.outgoingFlights[i].arrivalDateTime);
    $scope.outgoingFlights[i].arrivalDateTime   = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();
  }

  // converting return flights dated into form of hours and minutes
  for(i = 0; i < $scope.returnFlights.length; i++){
    //departure time
    var departureTime                           = new Date($scope.returnFlights[i].departureDateTime);
    $scope.returnFlights[i].departureDateTime   = departureTime.getUTCHours()+":"+departureTime.getUTCMinutes();

    // arrival time
    var arrivalTime                             = new Date($scope.returnFlights[i].arrivalDateTime);
    $scope.returnFlights[i].arrivalDateTime     = arrivalTime.getUTCHours()+":"+arrivalTime.getUTCMinutes();
  }

  // array to store indexes of selected flights
  $scope.info   = [];

  // model to represent which flight to show its information
  $scope.trans  = {id: -1};

  // View number in the stepper
  $scope.step   = 1;

  // function will be performed when submitting reserve button
  $scope.moveForward = function(){
    if(!$scope.info[0] || ($scope.tripType == 2 && !$scope.info[1] && $scope.returnFlights.length > 0)) {
      Materialize.toast('Please select the flight.',3000);
    }
    else {


    // passing selected outgoing flight to the global service
      global.outGoingTrip = $scope.outgoingFlights[$scope.info[0]];
      if ($scope.tripType == 2){
        // passing selected return flight to the global service
        global.returnTrip = $scope.returnFlights[$scope.info[1]];
      }
      if($scope.tripType == 2 &&  $scope.returnFlights.length==0)
        global.searchFlight.tripType = 1;
      $location.path('/passengers');
    }


  };
});

/**
*function that capitalize first letter in a string
*/
function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}
