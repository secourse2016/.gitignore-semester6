var app=angular.module('austrianAirlinesApp');
app.factory('flights', [function(){
  var o = 
{booking:{
  passengers: [],
      ingoing_flights:[
      {f:[
         {
          flightNumber: "LH173",
          aircraft_code : "A321",
          origin : "Berlin-Tegel",
          origin_app : "TXL",
          origin_term :  1,
          destination : "Frankfurt/Main International Airport",
          destination_app :"FRA",
          destination_term : 1,
          departure_time : "6:45",
          arrival_time : "7:55"
          }
         ,
          {
          flightNumber: "LH582",
          aircraft_code : "A321",
          origin : "Frankfurt/Main International Airport",
          origin_app : "FRA",
          origin_term :  1,
          destination : "Cairo Internationall",
          destination_app :"CAI",
          destination_term : 3,
          departure_time : "10:00",
          arrival_time : "15:05"
          
          }
      ],
     economy: 400, bussiness: 1200},
      {f:[
      
         {
          flightNumber: "LX963",
          aircraft_code : "A320",
          origin : "Berlin-Tegel",
          origin_app : "TXL",
          origin_term :  1,
          destination : "Zurich",
          destination_app :"ZRH",
          destination_term : 1,
          departure_time : "6:50",
          arrival_time : "8:20"
          }
         ,
          {
          flightNumber: "LX236",
          aircraft_code : "A320",
          origin : "Zurich",
          origin_app : "FRA",
          origin_term :  1,
          destination : "Cairo Internationall",
          destination_app :"CAI",
          destination_term : 3,
          departure_time : "9:5",
          arrival_time : "14:05"
          
          }
      ]
      ,
     economy: 500, bussiness: 1300}
      ],
      outgoing_flights:[
      {f:[
        {
          flightNumber: "LH578",
          aircraft_code : "A320",
          origin : "Cairo International",
          origin_app : "CAI",
          origin_term :  3,
          destination : "Munich-Frans Josef trauss",
          destination_app :"MUC",
          destination_term : 2,
          departure_time : "3:10",
          arrival_time : "6:00"
          }
         ,
          {
          flightNumber: "LH2030",
          aircraft_code : "A319",
          origin : "Munich-Frans Josef trauss",
          origin_app : "MUC",
          origin_term :  2,
          destination : "Berlin-Tegel",
          destination_app :"TXL",
          destination_term : 1,
          departure_time : "7:00",
          arrival_time : "8:05"
          
          }
      ],
     economy: 600, bussiness: 1500},
      {f:[
      
        {
          flightNumber: "LH578",
          aircraft_code : "A320",
          origin : "Cairo International",
          origin_app : "CAI",
          origin_term :  3,
          destination : "Munich-Frans Josef trauss",
          destination_app :"MUC",
          destination_term : 2,
          departure_time : "3:10",
          arrival_time : "6:00"
          }
         ,
          {
          flightNumber: "LH2032",
          aircraft_code : "A320",
          origin : "Munich-Frans Josef trauss(MUC)",
          origin_app : "MUC",
          origin_term :  2,
          destination : "Berlin-Tegel",
          destination_app :"TAX",
          destination_term : 1,
          departure_time : "8:00",
          arrival_time : "9:05"
          
          }
      ],
      economy: 700, bussiness: 2000},
      {f:[
        {
          flightNumber: "LH585",
          aircraft_code : "A321",
          origin : "Cairo International",
          origin_app : "CAI",
          origin_term :  3,
          destination : "Frankfurt/Main International Airport",
          destination_app :"FRA",
          destination_term : 1,
          departure_time : "5:10",
          arrival_time : "8:35"
          }
         ,
          {
          flightNumber: "LH178",
          aircraft_code : "A320",
          origin : "Frankfurt/Main International Airport",
          origin_app : "FRA",
          origin_term :  1,
          destination : "Berlin-Tegel",
          destination_app :"TAX",
          destination_term : 1,
          departure_time : "9:45",
          arrival_time : "10:55"
          
          }
      ],
      economy: 650, bussiness: 1800}
      ],
  //total_price : 5000,
  booking_date : "10/4/1016",
  is_successful : "False"
}};
return o;
  // var o = {
  //   outgoing: [
  //   	{dep: "10 AM",arr: "1PM", stops: 1, economy: 500, bussiness: 1000, flights: [{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"},{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"}]},
  //   	{dep: "10 AM",arr: "1PM", stops: 1, economy: 500, bussiness: 1000, flights: [{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"},{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"}]}
  //   ],
  //   ingoing: [
  //     {dep: "10 AM",arr: "1PM", stops: 1, economy: 500, bussiness: 1000, flights: [{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"},{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"}]},
  //     {dep: "10 AM",arr: "1PM", stops: 1, economy: 500, bussiness: 1000, flights: [{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"},{src: "cairo",dest:"munich",dep: "10 AM",arr: "1PM"}]}

  //   ],
  //   indexOut: 0,
  //   ClassOut:0,
  //   indexIn: 0,
  //   classIn: 0
  // };
  // return o;
}]);

app.controller('FlightsCtrl', 

function($scope,flights){

  $scope.booking=flights.booking;
  $scope.info = [];
  $scope.trans ={id: -1};
  console.log($scope.booking.outgoing_flights[0].economy);
  $scope.moveForward = function(){
    $scope.booking.chosen_outgoing_flights.class=parseInt($scope.info[0].substring(0,1));
    $scope.booking.chosen_ingoing_flights.class=parseInt($scope.info[1].substring(0,1));
    $scope.booking.chosen_outgoing_flights.flights=$scope.booking.outgoing[parseInt($scope.info[0].substring(2))].f;
    $scope.booking.chosen_ingoing_flights.flights=$scope.booking.ingoing[parseInt($scope.info[1].substring(2))].f;
    if($scope.booking.chosen_outgoing_flights.class==1)
      $scope.booking.total_price=$scope.booking.outgoing[parseInt($scope.info[0].substring(2))].economy+$scope.booking.outgoing[parseInt($scope.info[1].substring(2))].economy;
    else
       $scope.booking.total_price=$scope.booking.outgoing[parseInt($scope.info[0].substring(2))].bussiness+$scope.booking.outgoing[parseInt($scope.info[1].substring(2))].bussiness; 
  $scope.info=[];
  };
  // $scope.outgoingFlights = flights.outgoing;
  // $scope.ingoingFlights = flights.ingoing;
  // $scope.info = [];
  // $scope.trans ={id: -1};
  // console.log($scope.outgoingFlights.length);
  // $scope.moveForward = function(){
  //   $scope.classOut=parseInt($scope.info[0].substring(0,1));
  //   $scope.classIn=parseInt($scope.info[1].substring(0,1));
  //   $scope.indexOut=parseInt($scope.info[0].substring(2));
  //   $scope.indexIn=parseInt($scope.info[1].substring(2));
   
  //   $scope.info=[];
  
  
  

});