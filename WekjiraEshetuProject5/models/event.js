
const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    
    category: {type: String, required: [true, 'category is required'], enum : [ "Food and Nutrition Services", "Recreational Event", "Voluntary","Catering", "School Lunch" ]},
    title: {type: String, required: [true, 'title is required']},
    hostName: {type: Schema.Types.ObjectId, ref: 'User'},
    startDateTime: {type: Date, required: [true, 'startDateTime is required']},
    endDateTime: {type: Date, required: [true, 'endDateTime is required']},
    location: {type: String, required: [true, 'location is required']},
    details: {type: String, required: [true, 'details is required']},
    image: {type: String, required: [true, 'image is required']}



}

);



// collection name is events in the database
module.exports = mongoose.model('Event', eventSchema );



   

