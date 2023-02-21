
const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');

const events =[
    { 
    id:'1',
    category: 'Food and Nutrition Services',
    title: 'Event Catering Ideas',
    hostName: ' Community Kitchen Program',
    startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    location: '3601 Central Ave, Charlotte, NC 28205',
    details:' Event planners these days have many things to think about when balancing attendee needs and desires.Here are a few delicious catering menu ideas to try.',
    image: '/images/cater.jpg'
    },
    { 
        id:'2',
        // category: 'Food and Nutrition Services',
        title: 'Event Catering Ideas',
        hostName: ' Community Kitchen Program',
        startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        location: '3601 Central Ave, Charlotte, NC 28205',
        details:' Event planners these days have many things to think about when balancing attendee needs and desires.Here are a few delicious catering menu ideas to try.',
        image: '/images/edit.png' 
        },
        { 
            id:'3',
            // category: 'Food and Nutrition Services',
            title: 'Event Catering Ideas',
            hostName: ' Community Kitchen Program',
            startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
            endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
            location: '3601 Central Ave, Charlotte, NC 28205',
            details:' Event planners these days have many things to think about when balancing attendee needs and desires.Here are a few delicious catering menu ideas to try.',
            image: '/images/edit.png' 
            },
    {
        id:'4',
        category: 'Great Golf Event',
        title: 'How to Organize a Basketball',
        hostName: ' Community Kitchen Program',
        startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        location: '3601 Central Ave, Charlotte, NC 28205',
        details:' Event planners these days have many things to think about when balancing attendee needs and desires.Here are a few delicious catering menu ideas to try.',
        image: '/images/edit.png' 

    },
    {
        id:'5',
       // category: 'Great Golf Event',
        title: 'How to Organize a Basketball',
        hostName: ' Community Kitchen Program',
        startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        location: '3601 Central Ave, Charlotte, NC 28205',
        details:' Event planners these days have many things to think about when balancing attendee needs and desires.Here are a few delicious catering menu ideas to try.',
        image: '/images/edit.png' 

    },
    {
        id:'6',
        //category: 'Great Golf Event',
        title: 'How to Organize a Basketball',
        hostName: ' Community Kitchen Program',
        startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        location: '3601 Central Ave, Charlotte, NC 28205',
        details:' Event planners these days have many things to think about when balancing attendee needs and desires.Here are a few delicious catering menu ideas to try.',
        image: '/images/edit.png' 

    },
    {
        id:'7',
        //category: 'Great Golf Event',
        title: 'How to Organize a Basketball',
        hostName: ' Community Kitchen Program',
        startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        location: '3601 Central Ave, Charlotte, NC 28205',
        details:' Event planners these days have many things to think about when balancing attendee needs and desires.Here are a few delicious catering menu ideas to try.',
        image: '/images/edit.png' 

    },
    {

    }
];

 exports.find =function(){
    return events;
 };

 exports.findById =function(id){

    return events.find(event=>event.id ===id);

    };

exports.save =function(event){
    event.id =uuidv4();
    event.startDateTime = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    event.endDateTime = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    events.push(event);
}

exports.updateById =function(id, newStory){
    let event =events.find(event=>event.id ===id);
    if(event){
        event.category =newStory.category;
        event.title = newStory.title;
        event.hostName =newStory.hostName;
        event.startDateTime = newStory.startDateTime;
        event.endDateTime =newStory.endDateTime;
        event.location = newStory.location;
        event.details =newStory.details;
        event.image =newStory.image;
        return true;
    }else{
       return false;
    }
 
}
exports.deleteById = function(id){
    let index = events.findIndex(event =>event.id ===id);
    if(index !==-1){
        events.splice(index, 1);
        return true;
    }else{
        return false;
    }
}

