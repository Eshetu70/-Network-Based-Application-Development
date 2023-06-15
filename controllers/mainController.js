
const User =require('../models/user.js')

exports.index =(req, res)=>{
    let user_id = req.session.user;
    User.findById(user_id)
    .then(user=>{
        if(user){
            res.render('index.ejs',{user});
        }else{
            res.render('index.ejs'); 
        }
   
    })

};

exports.about= (req, res) => {
    let user_id = req.session.user;
    User.findById(user_id)
    .then(user=>{
        if(user){
            res.render('about.ejs', {user});
        }else{
            res.render('about.ejs');
        }
   
    })
   
};

exports.contact = (req, res) => {

    let user_id = req.session.user;
    User.findById(user_id)
    .then(user=>{
        if(user){
            res.render('contact.ejs', {user});
        }else{
            res.render('contact.ejs');
        }
   
    })

};

