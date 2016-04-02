var app = angular.module('austrianAirlinesApp');
app.controller('passengerViewCtrl' , function($scope){
  //for testing.
  $scope.passengers = [   {"type" : 'Adult'}  , {"type" : 'Child'} ];
    // to be filled.
    $scope.formData =[];

    //very dummy testing
    $scope.outgoingFlight =[
      {
        "origin" :"CAI",
        "destination" : "JFK",
        "flights" : [
        {
        "airport" : "CAI - Cairo",
        "duration" : 3,
        "date" : "25 March , 8:00 PM",
        "class" : "Economy",
        "seat" : "31B"
      } ,
      {
        "airport" : "Tegel - Berlin",
        "duration" : 5,
        "date" : "25 March , 5:00 PM",
        "class" : "Economy",
        "seat" : "17F"
      } ,
      {
        "airport" : "JFK - USA",
        "duration" : "" ,
        "date" : "26 March , 1:00 AM",
        "class" : "",
        "seat" : ""
      }
    ]
    }];

    $scope.returnFlight =[
      {
        "origin" :"JFK",
        "destination" : "CAI",
        "flights" : [
        {
        "airport" : "JFK - USA",
        "duration" : 5,
        "date" : "31 March , 11:00 PM",
        "class" : "Economy",
        "seat" : "09A"
      } ,
      {
        "airport" : "Tegel - Berlin",
        "duration" : 3,
        "date" : "April 1 , 4:00 AM",
        "class" : "Economy",
        "seat" : "22D"
      } ,
      {
        "airport" : "CAI - Cairo",
        "duration" : "",
        "date" : "April 1 , 7:00 AM",
        "class" : "",
        "seat" : ""
      }
    ]
    }];

    $scope.submitForm = function() {
      // handling adding data to passenger service by @khlly
    }
});
