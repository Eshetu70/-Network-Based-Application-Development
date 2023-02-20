

const ejs = require('ejs');
// const express =require('express');
// const router =express.Router();
// const { v4: uuidv4 } = require('uuid');

//GET /stories : send all storiess

const model =require('../models/story');

exports.index = (req, res)=>{
    //res.send('send all stories');
    //res.send(model.find());
    let stories = model.find();
    res.render('./story/index.ejs',{stories});
};

//GET /Stories/new send html form for creating new stories
exports.new=(req, res)=>{
    //res.send('Send new form')
    res.render('./story/new.ejs')
};
//POST /stories: create new stories
exports.create=(req, res)=>{
   //res.send('create new stories',{stories}) 
   //console.log(req.body);
   let story =req.body;
   model.save(story);
   res.redirect('/stories');
};
//GET /stories/:id: send detials of

exports.show = (req, res, next)=>{
    // res.send('send all stories with id: '+ req.params.id);
  let id =req.params.id;
  let story =model.findById(id);
  if(story){
    res.render('./story/show.ejs',{story});
  }else{
   
    let err = new Error('Cannot find story with id '+ id);
    err.status =404;
    next(err);
  }
 
};


//Get /Stories/:id/edit: send the html form for editing

exports.edit=(req, res, next)=>{
    let id =req.params.id;
    let story =model.findById(id);
    if(story){
        res.render('./story/edit.ejs',{story});
      }else{
        let err = new Error('Cannot find story with id '+ id);
        err.status =404;
        next(err);
      }
     
   

};

//PUT /stories/:id: update the story identified by id

exports.update =(req, res, next)=>{

  let story =req.body;
   let id =req.params.id;
  if( model.updateById(id, story)){
    res.redirect('/stories/'+id)
  }else{
    let err = new Error('Cannot find story with id '+ id);
    err.status =404;
    next(err);
  }
    //res.send('updated stories with id: ' + req.params.id);

};

//Delete  /stories/:id, delete the story identified by id
exports.delete=(req, res, next)=>{
    let id =req.params.id;
    if(model.deleteById(id)){
      res.redirect('/stories');
    }else{
      //res.status(404).send('Cannot find story with id'+ id);
      let err = new Error('Cannot find story with id '+ id);
      err.status =404;
      next(err);
    }
};


