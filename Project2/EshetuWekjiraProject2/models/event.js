
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
        category: 'Food and Nutrition Services',
        title: 'Benefits of a Lunch-and-Learn',
        hostName: ' Carolina Road Runner Club',
        startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        location: '4601 Widding Ave, Charlotte, NC 28205',
        details:'Even though they operate in teams, customer service and support work is often done one-on-one with customers. And, if they do collaborate with other reps, most teams use an internal messaging system to communicate which is not the most engaging or personable form of communication.',
        image: '/images/lunchconcept.jpg' 
        },
        { 
            id:'3',
            category: 'Food and Nutrition Services',
            title: 'Quick and Fast Catering Ideas',
            hostName: ' Robel Mamo',
            startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
            endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
            location: '10121 Big Laurel Ave, Charlotte, NC 28268',
            details: 'Gourmet food and an elegant presentation are where we shine, and it all starts with using the purest ingredients. We work with you to create a fully customized and unique food experience that suits your tastes and dietary restrictions.',
            image: '/images/fast_food.jpg' 
            },
    {
        id:'4',
        category: 'Recreational Event',
        title: 'How to Organize a Basketball',
        hostName: ' Community Kitchen Program',
        startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        location: '3601 Central Ave, Charlotte, NC 28205',
        details:' Event planners these days have many things to think about when balancing attendee needs and desires.Here are a few delicious catering menu ideas to try.',
        image: '/images/basket.jpg' 

    },
    {
        id:'5',
        category: 'Recreational Event',
        title: 'Great Golf Event Ideas',
        hostName: 'Chefs of Charlotte Community Kitchen Program',
        startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        location: 'Palisade Country Club 13704 Grand Palised PKwy, Charlotte, NC 28278',
        details:'Golf tournaments, whether they are used for business purposes or as charity events, have exploded in popularity over the past few years. Most serious golfers could attend a tournament every weekend (and some do), so creating a unique event can be a daunting task.',
        image: '/images/Golf.jpg' 

    },
    {
        id:'6',
        category: 'Recreational Event',
        title: 'How to Teach Kids to Golf',
        hostName: 'William Robert ',
        startDateTime: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        endDateTime:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        location: '3540N sharon Amity, Charlotte, NC 28205',
        details:'Our trained coaches not only provide an introduction to junior golf and an opportunity to enhance golf skills, but they also create a safe, supportive, and empowering environment to help your child prepare for life ahead, including friendships, school, college and even their careers.',
        image: '/images/Kid.jpg' 

    },
];

 exports.selectedCategory=function(){

    let categories=[];
    events.forEach(event=>{
        if(!categories.includes(event.category)){
            categories.push(event.category)
        }

    });
    return categories;
 }

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



