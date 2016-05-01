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
/**
 * create virtual field flightId which has value of _id
 */
flightSchema.virtual('flightId').get(function(){
    return this._id.toHexString();
});

/**
 * Make sure that every time we call toJSON include virtuals fields 
 */
flightSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Flight', flightSchema);
