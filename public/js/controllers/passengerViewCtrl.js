var app = angular.module('austrianAirlinesApp');
app.controller('passengerViewCtrl' , function($scope, global, $location){

  //for testing.
  // $scope.passengers = [{type : 'Adult'},{type:'Child'} ];
  //for filling it with passengers info .
  $scope.formData =[];
  $scope.errors =[];
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

      // boolean value to check the validation of the form.
        var isValid = true;

      // integer to indicate errors occurences
        var countErrors = 0;

      // loop in formData submitted to check fields.
        for (var i = 0; i < $scope.formData.length; i++) {

          if(!$scope.formData[i].firstName) {
            if(!$scope.errors[i])
              $scope.errors[i] = {};
            $scope.errors[i].firstName = true;
            countErrors++;
          }
          if(!$scope.formData[i].lastName) {
            if(!$scope.errors[i])
              $scope.errors[i] = {};
            $scope.errors[i].lastName = true;
            countErrors++;
          }

          if(!$scope.formData[i].nationality) {
            if(!$scope.errors[i])
              $scope.errors[i] = {};
            $scope.errors[i].nationality = true;
            countErrors++;
          }
        }
        // if error(s) found isValid is set to false.
        if(countErrors > 0 || $scope.formData.length == 0)
        isValid = false;

      // check validity of the form .
        if(isValid) {
      // set passengers Array in service with filled passengers info .
        global.setPassengers($scope.formData);
      // redirect to confirmation page.
        $location.path('/confirmation');
      }
    }
});
