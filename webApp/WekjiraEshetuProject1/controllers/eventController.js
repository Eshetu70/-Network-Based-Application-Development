
const model = require('../models/event.js');


exports.index = (req, res) => {
    //res.send('send all events')
    let events = model.find();
    let categories= model.selectedCategory();
    res.render('./event/index.ejs', { events, categories})
};

exports.new = (req, res) => {
    res.render('./event/newEvent.ejs')
};


exports.create = (req, res) => {
    // res.send('created form')
    let event = req.body; 
    event.image = '/images/' + req.file.filename;
    model.save(event);
    res.redirect('/events')
     

};

exports.show = (req, res, next) => {

    let id = req.params.id;
    let event = model.findById(id);
    console.log(event)
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
        res.render('./event/edit.ejs', { event});
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
    event.image= '/images/'+ req.file.filename;
    console.log(req.file.filename)
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
