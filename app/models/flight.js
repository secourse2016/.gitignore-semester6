var mongoose = require('mongoose');
var schema = mongoose.Schema;

var flightSchema = new schema({
    flightNumber      :  String,
    aircraftType      :  { type: String ,default: 'Boeing'},
    aircraftModel     :  { type: Number ,default: 747},
    departureDateTime :  Number,
    arrivalDateTime   :  Number,
    origin            :  { type: String, maxlength: 3,uppercase: true ,ref: 'Airport' },
    destination       :  { type: String, maxlength: 3,uppercase: true ,ref: 'Airport' },
    cost              :  Number,
    currency          :  { type: String, maxlength: 3,uppercase: true ,default: 'USD' },
    class             :  {type: String, enum: ['economy','business'], default: 'economy' },
    Airline           :  {type: String, default: 'Austrian'},
    availableSeats    :  {type: Number, default: 200}
});

module.exports = mongoose.model('Flight', flightSchema);
