var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var flightSchema = new Schema({
  flightNumber      :  String,
  aircraftType      :  { type: String ,default: 'Boeing'},
  aircraftModel     :  { type: Number ,default: 747},
  departureDateTime :  Date,
  arrivalDateTime   :  Date,
  origin            :  { type: String, maxlength: 3,uppercase: true ,ref: 'Airport' },
  destination       :  { type: String, maxlength: 3,uppercase: true ,ref: 'Airport' },
  cost              :  Number,
  currency          :  { type: String, maxlength: 3,uppercase: true ,default: 'USD' },
  class             :  {type: String, enum: ['economy','business'], default: 'economy' },
  Airline           :  {type: String, default: 'Austrian'}
});


module.exports = mongoose.model('Flight', flightSchema);
