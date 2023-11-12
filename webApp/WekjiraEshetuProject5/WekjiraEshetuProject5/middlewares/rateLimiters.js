const rateLimit = require('express-rate-limit');

exports.logInLimiter = rateLimit({
    windowMs: 60*1000, //1 munutes time window
   max:5,
   //message: "Too may login requests. Try again later"
   handler: (req, res, next)=>{
    let err = new Error('Too may login requests. Try it again');
    err.status  = 429;
    return next(err);
   }
});