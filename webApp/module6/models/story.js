

const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');
const stories =[
    {id:'1',
    title:'My life at Charlotte',
    author:'Eshetu Wekjira',
    content: 'I have been live charlotte for five years, and I love to be here in charlotte; charlotte is such a quiet city so far, I see, and it is the place I would love to live.',
    createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },

    {
        id:'2',
        title:'Learning NBAD',
        author:'Eshetu Wekjira',
        content:'The National Basketball Association (NBA) is a professional basketball league in North America. The league is composed of 30 teams (29 in the United States and 1 in Canada) and is one of the major professional sports leagues in the United States and Canada.',
       
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)

    },
    {
        id:'3',
        title:'My Spring Break',
        author:'Eshetu Wekjira',
        content:'During my spring break, I had a great time with my family members and developed a website page for Community Kitchen Program.',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)

    }
];

exports.find =()=>stories;

 exports.findById =function(id){

 return stories.find(story=>story.id ==id);
 };

//console.log(stories[1]);
exports.save =function(story){
    story.id =uuidv4();
    story.createdAt =DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
stories.push(story);
};

exports.updateById =function(id, newStory){
    let story =stories.find(story=>story.id ==id);
    if(story){
        story.title = newStory.title;
        story.content =newStory.content;
        return true;
    }else{
       return false;
    }
   

}

exports.deleteById = function(id){
    let index = stories.findIndex(story =>story.id ===id);
    if(index !==-1){
        stories.splice(index, 1);
        return true;
    }else{
        return false;
    }
}