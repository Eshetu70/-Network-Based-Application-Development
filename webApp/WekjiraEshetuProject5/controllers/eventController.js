
const model = require('../models/event.js');
const User = require('../models/user.js')
const RSmodel = require('../models/rsvp.js')


const { DateTime } = require("luxon");
const { forEach } = require('lodash');

exports.index = (req, res, next) => {
    let user_id = req.session.user;
    model.find()
        .then(events => {
            Promise.all([User.findById(user_id), model.distinct('category')])
                .then(result => {
                    const [user, categories] = result;
                    if (user && categories) {
                        res.render('./event/index.ejs', { events, categories, user })
                    } else {
                        model.distinct('category')
                            .then(categories => {
                                res.render('./event/index.ejs', { events, categories })
                            }).catch(err => next(err));

                    }

                })
                .catch(err => next(err));
        })
        .catch(err => next(err));

};

exports.new = (req, res) => {
    let user_id = req.session.user;
    User.findById(user_id)
        .then(user => {
            if (user)
                res.render('./event/newEvent.ejs', { user })
        })

};


exports.create = (req, res, next) => {
    // res.send('created form')
    let event = new model(req.body);

    if (req.file) {
        event.image = '/images/' + req.file.filename;
    }
    event.hostName = req.session.user;
    event.save()
        .then(event => {
            req.flash('success', 'You have successfully created event!');
            res.redirect('/events')
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let user_id = req.session.user;
    let count = 0;
    Promise.all([User.findById(user_id), model.findById(id).populate('hostName', 'firstName lastName')])
        .then(result => {
            const [user, event] = result;
            RSmodel.find({ eventName: event.id })
                .then(rsvp => {
                    rsvp.forEach(ans => {
                        if (ans.status == "YES") {
                            count++;
                        } else {
                            count;
                        }
                    })
                    console.log(count)
                    if (event && user) {
                        return res.render('./event/event.ejs', { user, event, count });
                    } else if (event) {
                        return res.render('./event/event.ejs', { event, count });
                    }
                    else {
                        let err = new Error('Cannot find a event with id ' + id);
                        err.status = 404;
                        next(err);
                    }
                })
                .catch(err => next(err))

        })
        .catch(err => next(err))

};

//updated
exports.edit = (req, res, next) => {
    // res.send('send the edit form')
    let id = req.params.id;
    let user_id = req.session.user;
    Promise.all([User.findById(user_id), model.findById(id)])
        .then(result => {
            const [user, event] = result;
            console.log(event.startDateTime);

            let startDateTime = DateTime.fromJSDate(event.startDateTime).toISO({
                suppressMilliseconds: true,
                suppressSeconds: true,
                includeOffset: false,
            });
            let endDateTime = event.endDateTime.toISOString().replace("Z", "");
            console.log(startDateTime);
            if (event && user) {
                return res.render('./event/edit.ejs', { event, user, startDateTime, endDateTime });
            } else {
                return res.render('./event/edit.ejs', { event });

            }
        })
        .catch(err => next(err))


};


exports.status = (req, res, next) => {
    let rsvp = {
        status: req.body.buttonName,
        userName: req.session.user,
        eventName: req.params.id
    };
    let resvpModel = new RSmodel(rsvp);

    // resvpModel.save()

    RSmodel.findOneAndUpdate({ eventName: req.params.id }, { status: req.body.buttonName, userName: req.session.user },
        { useFindAndModify: false, runValidators: true, upsert: true })
        .then(rsvps => {
            console.log(rsvps)
            req.flash('success', 'RSVP created successfully!!');
            res.redirect('/users/profile/')

        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });
}


//put

exports.update = (req, res, next) => {
    // res.send('updated all events with id ' + req.params.id)
    let event = req.body;
    let id = req.params.id;
    event.hostName = req.session.user;

    if (req.file) {
        event.image = '/images/' + req.file.filename;
    }
    model.findByIdAndUpdate(id, event, { useFindAndModify: false, runValidators: true })

        .then(event => {
            req.flash('success', 'Event was updated successfully!!');
            res.redirect('/events/' + id);
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
            }
            next(err);
        });

};

//delete
exports.delete = (req, res, next) => {
    // res.send('delete all events with id ' + req.params.id)
    let id = req.params.id;
   // let event = req.body;
    //event.hostName = req.session.user;
    model.findByIdAndDelete(id, { useFindAndModify: false })
        .then(event => {
            RSmodel.deleteMany({ eventName: id }).then(() => {
                req.flash('success', 'Event was deleted successfully!!');
                res.redirect('/events');
            })
                .catch(err => next(err))

        })
        .catch(err => next(err))
};
