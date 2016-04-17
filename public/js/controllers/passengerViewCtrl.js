var app = angular.module('austrianAirlinesApp');
app.controller('passengerViewCtrl' , function($scope, global, $location){

  //for testing.
  // $scope.passengers = [{type : 'Adult'},{type:'Child'} ];
  //for filling it with passengers info .
  $scope.formData =[];
  $scope.formDataChildren =[];
  $scope.errors = [];
  $scope.errorsChildren = [];
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

    // function to validate adult form fields.
    if(validateForm($scope.formData,false,$scope) && validateForm($scope.formDataChildren,true,$scope)) {

      // Determine if the passenger is child or adult
      for(i = 0; i<$scope.formData.length; i++)
      $scope.formData[i].isChild = false;
      for(i = 0; i<$scope.formDataChildren.length; i++)
      $scope.formDataChildren[i].isChild = true;
      // set passengers Array in service with filled passengers info .
      global.setPassengers($scope.formData.concat($scope.formDataChildren));
      console.log(global.getPassengers());
      // redirect to confirmation page.
      $location.path('/confirmation');
    }

  }
});

/** function to validate birthDate of an adult.
* returns boolean to indicate validity.
*/
function validateDate(stringDate , isChild)
{
  var birthDate = new Date(Date.parse(stringDate));
  var nowDate = new Date(Date.now());
  var yearDifference = nowDate.getFullYear() - birthDate.getFullYear();
  if(birthDate >= nowDate)
  return false;
  if(!isChild)
  return yearDifference >= 12;
  else
  return yearDifference < 12 && yearDifference > 0;
}


/** function to validate email address.
* returns boolean to indicate validity.
* Using regular expressions to test email format.
*/
function validateEmail(email)
{
  if(!email)
  return false;
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

/** function to validate adults form fields.
* takes scope and callback function as parameters.
* returns boolean isValid to indicate form fields validity.
*/
function validateForm(formData, isChild, $scope) {
  errors = [];
  if(isChild)
  $scope.errorsChildren = errors;
  else
  $scope.errors = errors;


  // boolean value to check the validation of the form.
  var isValid = true;

  // integer to indicate errors occurences
  var countErrors = 0;
  // loop in formData submitted to check fields.
  for (var i = 0; i < formData.length; i++) {
    // check if first name  field is empty.
    if(!formData[i].firstName){
      if(!errors[i])
        errors[i] = {};
      errors[i].firstName = true;
      countErrors++;
    }



    // check if last name field is empty.
    if(!formData[i].lastName){
      if(!errors[i])
        errors[i] = {};
      errors[i].lastName = true;
      countErrors++;
    }

    // check if nationality field is empty.
    if(!formData[i].nationality)  {
      if(!errors[i])
        errors[i] = {};
      errors[i].nationality = true;
      countErrors++;
    }

    // check if passport number field is empty or is not valid.
    if(!formData[i].passportNumber){
      if(!errors[i])
        errors[i] = {};
      errors[i].passportNumber = true;
      countErrors++;
    }
    else if(formData[i].passportNumber.length < 7) {
      if(!errors[i])
        errors[i] = {};
      errors[i].passportNumberLength = true;
      countErrors++;
    }

    // check if email address field is empty or is not valid.
    if(!isChild && !validateEmail(formData[i].emailAddress))  {
      if(!errors[i])
        errors[i] = {};
      errors[i].emailAddressNotValid = true;
      countErrors++;
    }

    // check if birthDate field is empty or is not valid.
    if(!formData[i].birthDate) {
      if(!errors[i])
        errors[i] = {};
      errors[i].birthDateRequired = true;
      countErrors++;
    }
    else if(!validateDate(formData[i].birthDate , isChild)){
      if(!errors[i])
        errors[i] = {};
      errors[i].birthDateNotValid = true;
      countErrors++;
    }

    // check if error(s) found isValid is set to false.
    if(countErrors > 0 || formData.length == 0)
      isValid = false;

    return isValid;
  }
}
