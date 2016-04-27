var mongoose = require('mongoose');
var schema = mongoose.Schema;

var airportSchema = new schema({
    iata         :    { type: String, maxlength: 3,uppercase: true },
    lon          :  Number,
    iso          :  { type: String, maxlength: 2,uppercase: true },
    status       :  Number,
    name         :  String,
    continent    :  { type: String, maxlength: 2,uppercase: true },
    type         :  String,
    lat          :  Number,
    size         :  String
});

module.exports = mongoose.model('Airport', airportSchema);
