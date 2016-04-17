var app = angular.module('austrianAirlinesApp');
app.controller('passengerViewCtrl' , function($scope, global, $location){
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


  $scope.outgoingFlight  = angular.copy(global.outGoingTrip);
 
    // arrival time
    
  if($scope.tripType == 2){
    $scope.returnFlight    = angular.copy(global.returnTrip);
   
  }











  //for testing.
  // $scope.passengers = [{type : 'Adult'},{type:'Child'} ];
  //for filling it with passengers info .
  $scope.formData =[];

    // Get all information from the global service, to be used in the view
      if(!global.searchFlight.adults)
        global.searchFlight.adults = 1;
      if(!global.searchFlight.children)
        global.searchFlight.children = 0;
      $scope.infoFlow = global;

      $scope.adults = new Array(parseInt(global.searchFlight.adults));
      $scope.children = new Array(parseInt(global.searchFlight.children));
      $scope.step = 2;

      $scope.submitForm = function() {
      // set passengers Array in service with filled passengers info .
        global.setPassengers($scope.formData);
        $location.path('/confirmation');

      // for testing (Working)
      // console.log(global.getPassengers());
    }
});
