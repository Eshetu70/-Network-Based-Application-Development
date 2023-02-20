
const express =require('express');
const controller =require('../controllers/storyController')
const router =express.Router();
const { v4: uuidv4 } = require('uuid');

//GET /stories : send all storiess

router.get('/', controller.index);

//GET /Stories/new send html form for creating new stories
router.get('/new',controller.new);
//POST /stories: create new stories
router.post('/',controller.create);
//GET /stories/:id: send detials of

router.get('/:id', controller.show);

//Get /Stories/:id/edit: send the html form for editing

router.get('/:id/edit',controller.edit);

//PUT /stories/:id: update the story identified by id

router.put('/:id', controller.update);

//Delete  /stories/:id, delete the story identified by id
router.delete('/:id', controller.delete);


module.exports =router;