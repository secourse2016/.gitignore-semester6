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
      // initialize errors array.
        $scope.errors =[];

      // boolean value to check the validation of the form.
        var isValid = true;

      // integer to indicate errors occurences
        var countErrors = 0;

      // loop in formData submitted to check fields.
        for (var i = 0; i < $scope.formData.length; i++) {
          // check if nationality field is empty.
          if(!$scope.formData[i].firstName)
          {
            if(!$scope.errors[i])
              $scope.errors[i] = {};
            $scope.errors[i].firstName = true;
            countErrors++;
          }

          // check if nationality field is empty.
          if(!$scope.formData[i].lastName)
          {
            if(!$scope.errors[i])
              $scope.errors[i] = {};
            $scope.errors[i].lastName = true;
            countErrors++;
          }

          // check if nationality field is empty.
          if(!$scope.formData[i].nationality)
          {
            if(!$scope.errors[i])
              $scope.errors[i] = {};
            $scope.errors[i].nationality = true;
            countErrors++;
          }

        // check if passport number field is empty or is not valid.
        if(!$scope.formData[i].passportNumber)
        {
          if(!$scope.errors[i])
            $scope.errors[i] = {};
          $scope.errors[i].passportNumber = true;
          countErrors++;
        }
        else if($scope.formData[i].passportNumber.length < 7)
        {
        if(!$scope.errors[i])
          $scope.errors[i] = {};
        $scope.errors[i].passportNumberLength = true;
        countErrors++;
        }

        

      // check if birthDate field is empty or is not valid.
      if(!$scope.formData[i].birthDate) {
        if(!$scope.errors[i])
          $scope.errors[i] = {};
        $scope.errors[i].birthDateRequired = true;
        countErrors++;
      }
      else if(!validateDate($scope.formData[i].birthDate))
      {
        if(!$scope.errors[i])
          $scope.errors[i] = {};
        $scope.errors[i].birthDateNotValid = true;
        countErrors++;
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
  }

});

/** function to validate birthDate of an adult.
 * returns boolean to indicate validity.
 */
  function validateDate(stringDate) {
    var birthDate = new Date(Date.parse(stringDate));
    var nowDate = new Date(Date.now());
    return birthDate < nowDate && nowDate.getFullYear() - birthDate.getFullYear() >= 12;
  }
