var moment = require('moment');
var jsonfile = require('jsonfile');

var file = './flights.json';

var a = [{
  origin : "BOM",
  destination :"DEL"
},
{
  origin : "CAI",
  destination :"JED"
},{
  origin : "HKG",
  destination :"TPE"
},{
  origin : "JNB",
  destination :"CPT"
},{
  origin : "RUH",
  destination :"JED"
},{
  origin : "LHR",
  destination :"JFK"
},{
  origin : "LAS",
  destination :"LAX"
},{
  origin : "LAX",
  destination :"SFO"
},{
  origin : "FRA",
  destination :"TXL"
},{
  origin : "FCO",
  destination :"MXP"
}
];

var id = 1024;
var startDate = moment('2016-04-12','YYYY-MM-DD');
var endDate = moment('2016-05-31','YYYY-MM-DD').toDate().getTime();
var data = [];
for(;startDate.toDate().getTime() <= endDate;startDate.add(1, 'days')){
  for(var i = 0 ; i<10 ; i++){
    var endFlight = moment(startDate.toDate()).add(1, 'days');

    endFlight = endFlight.toDate().getTime();

    var flightNumber1 = a[i].origin.substring(0,2)+id.toString(16);

    id++;
    var flightNumber2 = a[i].destination.substring(0,2)+id.toString(16);
    id++;
    data.push({flightNumber:flightNumber1, departureDateTime:startDate.toDate().getTime(), arrivalDateTime:
    endFlight,origin:a[i].origin,destination:a[i].destination,cost: Math.floor((Math.random() * 500) + 400)});
    data.push({flightNumber:flightNumber2, departureDateTime:startDate.toDate().getTime(), arrivalDateTime:
    endFlight,origin:a[i].destination,destination:a[i].origin,cost: Math.floor((Math.random() * 500) + 400)});
    data.push({flightNumber:flightNumber1, departureDateTime:startDate.toDate().getTime(), arrivalDateTime:
    endFlight,origin:a[i].origin,destination:a[i].destination,cost: Math.floor((Math.random() * 700) + 900), class:'business'});
    data.push({flightNumber:flightNumber2, departureDateTime:startDate.toDate().getTime(), arrivalDateTime:
    endFlight,origin:a[i].destination,destination:a[i].origin,cost: Math.floor((Math.random() * 700) + 900), class: 'business'});

  }
}
var myJsonString = JSON.stringify(data);
jsonfile.writeFile(file, data, function (err) {
  console.error(err);
});
