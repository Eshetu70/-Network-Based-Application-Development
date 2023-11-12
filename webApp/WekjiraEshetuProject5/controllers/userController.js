const model = require('../models/user.js');
const Event = require('../models/event.js');
const Rsvp= require('../models/rsvp.js');

exports.new = (req, res)=>{
    return res.render('./user/new.ejs');
};

exports.create = (req, res, next)=>{
        let user = new model(req.body);
        if(user.email)
        user.email =user.email.toLowerCase();
        user.save()
        .then(user=> res.redirect('/users/login'))
        .catch(err=>{
            if(err.name === 'ValidationError' ) {
                req.flash('error', err.message);  
                return res.redirect('/users/new');
            }
    
            if(err.code === 11000) {
                req.flash('error', 'Email has been used');  
                return res.redirect('/users/new');
            }
            
            next(err);
        }); 
   
};

exports.getUserLogin = (req, res, next) => {
    return res.render('./user/login.ejs');
    
}

exports.login = (req, res, next)=>{
    let email = req.body.email;
    if(email)
    email = email.toLowerCase();
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'wrong email address');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/');
            } else {
                req.flash('error', 'wrong password');      
                res.redirect('/users/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
    
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
   
    console.log(id);
   Promise.all([model.findById(id), Event.find({hostName:id}), Rsvp.find({userName:id}).populate("userName").populate("eventName")])
    .then(results=>{
        const [user, events, rsvps]=results;
        console.log(rsvps);
        res.render('./user/profile.ejs', {user, events, rsvps})
    })
    .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };



