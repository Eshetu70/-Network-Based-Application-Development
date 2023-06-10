
const Event = require('../models/event')
const RSmodel = require('../models/rsvp')

exports.isGuest =(req, res, next)=>{
    if(!req.session.user){

        return next();
    }
    else{
      req.flash('error', 'You are logged in already')  ;
      return res.redirect('/users/profile');
    }

};

//check if user is authenticated
exports.isLoggedIn =(req, res, next)=>{

    if(req.session.user){

        return next();
    }
    else{
      req.flash('error', 'You need to login first')  ;
      return res.redirect('/users/login');
    }
};

//check if user is of the story
exports.isAuthor =(req, res, next)=>{
let id =  req.params.id;
Event.findById(id)
.then(event=>{
    if(event){
        if(event.hostName ==req.session.user){
            return next()
        }else{
           let err = new Error('Unauthorized to access the resource');
           err.status =401;
           return next(err);
        }
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }

})
.catch(err=>next(err));
};


exports.isAuthors =(req, res, next)=>{
    let id =  req.params.id;
    Event.findById(id)
    .then(event=>{
        if(event){
            if(event.hostName ==req.session.user){
                let err = new Error('This event belongs to the hosts; you cannot create RSVPs for your events.');
                err.status =401;
                return next(err);
            }else{
                return next()
            }
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    
    })
    .catch(err=>next(err));
    };
    