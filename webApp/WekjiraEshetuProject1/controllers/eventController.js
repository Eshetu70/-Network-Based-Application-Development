
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

exports.show = (req, res) => {

    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./event/event.ejs', { event });
    } else {
        res.status(404).send('cannot find event with id ' + id)
    }


    //    res.send('send all events with id ' +req.params.id)
};

//updated
exports.edit = (req, res) => {
    // res.send('send the edit form')
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./event/edit.ejs', { event });
    } else {
        res.status(404).send('cannot find event with id ' + id);
    }


};

//put

exports.update = (req, res) => {
    // res.send('updated all events with id ' + req.params.id)
    let event =req.body;
    let id =req.params.id;
    if(model.updateById(id, event)){
        res.redirect('/events')
    }else{
        res.status(404).send('cannot find event with id'+ id)
    }
};

//delete
exports.delete = (req, res) => {
    // res.send('delete all events with id ' + req.params.id)
    let id =req.params.id;
    if(model.deleteById(id)){
        res.redirect('/events')  
    }   
    else{
        res.status(404).send('cannot find event with id'+ id)
    }
       
    
};
