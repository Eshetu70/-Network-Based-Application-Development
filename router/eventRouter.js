const express =require('express');
const controller =require('../controllers/eventController')
const {fileUpload} = require('../middlewares/fileUpload');

const {isLoggedIn, isAuthor, isAuthors} =require('../middlewares/auth')

const {validateId, validateEvents, validateResult, validateRSVP } =require('../middlewares/validator')

const router =express.Router();

router.get('/',controller.index);

router.get('/new',  isLoggedIn, controller.new);

//post /events: create a new events

router.post('/',  isLoggedIn, fileUpload, validateEvents, validateResult, controller.create);

router.get('/:id', validateId, controller.show);

//updated
router.get('/:id/edit', isLoggedIn, validateId, isAuthor, controller.edit);

router.post('/:id/rsvp', isLoggedIn, validateId, isAuthors, controller.status);

// router.put('/:id', isLoggedIn, validateId,controller.statusUpdated);

//put/events/:id: update the story identified by id

router.put('/:id', isLoggedIn, validateId, isAuthor, fileUpload, validateEvents, validateResult, controller.update);

//delete
router.delete('/:id',  isLoggedIn, validateId, isAuthor,controller.delete);


module.exports =router;