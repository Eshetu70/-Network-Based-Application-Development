
const {body} = require('express-validator')
const {validationResult} = require('express-validator');


exports.validateId =(req, res, next)=>{
    let id =  req.params.id;
    if(id.match(/^[0-9a-fA-F]{24}$/)) {
        return next();
    }else{
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

}


exports.validateSignUp = [body('firstName', 'first name cannnot be empty').notEmpty().trim().escape(),
body('lastName', 'last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at leat 8 character and at most 64 character').isLength({min:8, max:64})]

exports.validateLogin =[body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at leat 8 character and at most 64 character').isLength({min:8, max:64})]


exports.validateResult =(req, res, next)=>{
    let errors =validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }else{
        return next();
    }
};


exports.validateEvents = [body('category', 'category cannnot be empty').notEmpty().trim().escape(), 
body('title', ' title cannot be empty').notEmpty().trim().escape(),
body('startDateTime', 'startDateTime: cannot be empty and enter valid date and time').isISO8601().isBefore(),
body('endDateTime', 'endDateTime cannot be empty and enter valid date and time').isISO8601().isAfter(),
body('location', 'location cannot be empty and enter valid address').notEmpty().trim().escape(),
body('details', 'details cannot be empty').notEmpty().trim().escape()
]