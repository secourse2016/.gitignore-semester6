angular.module('austrianAirlinesApp').service('flights',function(){
  this.outgoingFlights = [];
  this.returnFlights = [];
	this.booking={
  origin:"Cairo",
  destination:"Berlin",
      ingoing_flights:[
      {flights:[
         {
          flightNumber: "LH173",
          aircraft_code : "A321",
          origin : "Berlin-Tegel",
          origin_abb : "TXL",
          origin_term :  1,
          destination : "Frankfurt/Main International Airport",
          destination_abb :"FRA",
          destination_term : 1,
          departure_time : "6:45",
          arrival_time : "7:55"
          }
         ,
          {
          flightNumber: "LH582",
          aircraft_code : "A321",
          origin : "Frankfurt/Main International Airport",
          origin_abb : "FRA",
          origin_term :  1,
          destination : "Cairo Internationall",
          destination_abb :"CAI",
          destination_term : 3,
          departure_time : "10:00",
          arrival_time : "15:05"
          
          }
      ],
     economy: 400, bussiness: 1200},
      {flights:[
      
         {
          flightNumber: "LX963",
          aircraft_code : "A320",
          origin : "Berlin-Tegel",
          origin_abb : "TXL",
          origin_term :  1,
          destination : "Zurich",
          destination_abb :"ZRH",
          destination_term : 1,
          departure_time : "6:50",
          arrival_time : "8:20"
          }
         ,
          {
          flightNumber: "LX236",
          aircraft_code : "A320",
          origin : "Zurich",
          origin_abb : "FRA",
          origin_term :  1,
          destination : "Cairo Internationall",
          destination_abb :"CAI",
          destination_term : 3,
          departure_time : "9:5",
          arrival_time : "14:05"
          
          }
      ]
      ,
     economy: 500, bussiness: 1300}
      ],
      outgoing_flights:[
      {flights:[
        {
          flightNumber: "LH578",
          aircraft_code : "A320",
          origin : "Cairo International",
          origin_abb : "CAI",
          origin_term :  3,
          destination : "Munich-Frans Josef trauss",
          destination_abb :"MUC",
          destination_term : 2,
          departure_time : "3:10",
          arrival_time : "6:00"
          }
         ,
          {
          flightNumber: "LH2030",
          aircraft_code : "A319",
          origin : "Munich-Frans Josef trauss",
          origin_abb : "MUC",
          origin_term :  2,
          destination : "Berlin-Tegel",
          destination_abb :"TXL",
          destination_term : 1,
          departure_time : "7:00",
          arrival_time : "8:05"
          
          }
      ],
     economy: 600, bussiness: 1500},
      {flights:[
      
        {
          flightNumber: "LH578",
          aircraft_code : "A320",
          origin : "Cairo International",
          origin_abb : "CAI",
          origin_term :  3,
          destination : "Munich-Frans Josef trauss",
          destination_abb :"MUC",
          destination_term : 2,
          departure_time : "3:10",
          arrival_time : "6:00"
          }
         ,
          {
          flightNumber: "LH2032",
          aircraft_code : "A320",
          origin : "Munich-Frans Josef trauss(MUC)",
          origin_abb : "MUC",
          origin_term :  2,
          destination : "Berlin-Tegel",
          destination_abb :"TAX",
          destination_term : 1,
          departure_time : "8:00",
          arrival_time : "9:05"
          
          }
      ],
      economy: 700, bussiness: 2000},
      {flights:[
        {
          flightNumber: "LH585",
          aircraft_code : "A321",
          origin : "Cairo International",
          origin_abb : "CAI",
          origin_term :  3,
          destination : "Frankfurt/Main International Airport",
          destination_abb :"FRA",
          destination_term : 1,
          departure_time : "5:10",
          arrival_time : "8:35"
          }
         ,
          {
          flightNumber: "LH178",
          aircraft_code : "A320",
          origin : "Frankfurt/Main International Airport",
          origin_abb : "FRA",
          origin_term :  1,
          destination : "Berlin-Tegel",
          destination_abb :"TAX",
          destination_term : 1,
          departure_time : "9:45",
          arrival_time : "10:55"
          
          }
      ],
      economy: 650, bussiness: 1800}
      ],
  booking_date : "10/4/1016",
  is_successful : "False"
}
});