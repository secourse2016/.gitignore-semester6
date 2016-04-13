var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var airportSchema = new Schema({
  iata:    { type: String, maxlength: 3,uppercase: true },
  lon:  Number,
  iso:  { type: String, maxlength: 2,uppercase: true },
  status:  Number,
  name:  String,
  continent:  { type: String, maxlength: 2,uppercase: true },
  type:  String,
  lat:  Number,
  size:  String
});


var Airport = mongoose.model('Airport', airportSchema);
