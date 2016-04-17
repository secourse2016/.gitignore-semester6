var app = angular.module('austrianAirlinesApp');
app.controller('passengerViewCtrl' , function($scope, global, $location){

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
    }
});
