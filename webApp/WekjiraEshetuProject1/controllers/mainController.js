
const model = require('../modules/event.js');



exports.about= (req, res) => {
    res.render('/views/about.ejs')
};

//post

exports.contact = (req, res) => {
    res.render('contact.ejs')

};

