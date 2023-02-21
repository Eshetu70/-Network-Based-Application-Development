
const model = require('../modules/event.js');

exports.index = (req, res) => {
    //res.send('send all events')
    let events = model.find();
    res.render('./event/index.ejs', { events })
};

exports.new = (req, res) => {
    res.render('./event/newEvent.ejs')
};

//post

exports.create = (req, res) => {
    // res.send('created form')
    let event = req.body; 
    model.save(event);
    res.redirect('/events')
   

};

exports.show = (req, res, next) => {

    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./event/event.ejs', { event });
    } else {
        let err = new Error('Cannot find a event with id '+ id);
        err.status=404;
        next(err);
    }


    //    res.send('send all events with id ' +req.params.id)
};

//updated
exports.edit = (req, res, next) => {
    // res.send('send the edit form')
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./event/edit.ejs', { event });
    } else {
        let err = new Error('Cannot find a event with id '+ id);
        err.status=404;
        next(err);
    }


};

//put

exports.update = (req, res, next) => {
    // res.send('updated all events with id ' + req.params.id)
    let event =req.body;
    let id =req.params.id;
    if(model.updateById(id, event)){
        res.redirect('/events/')
    }else{
        let err = new Error('Cannot find a event with id '+ id);
        err.status=404;
        next(err);
    }
};

//delete
exports.delete = (req, res, next) => {
    // res.send('delete all events with id ' + req.params.id)
    let id =req.params.id;
    if(model.deleteById(id)){
        res.redirect('/events')  
       
    }   
    else{
        let err = new Error('Cannot find a event with id '+ id);
        err.status=404;
        next(err);
    }
       
    
};
