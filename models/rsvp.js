
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    status: {type: String, required: [true, 'Status is required'], enum : [ "YES", "NO", "MAYBE"]},
    userName: {type: Schema.Types.ObjectId, ref: 'User'},
    eventName: {type: Schema.Types.ObjectId, ref: 'Event'},
}

);


// collection name is rsvps in the database
module.exports = mongoose.model('RSVP', rsvpSchema );