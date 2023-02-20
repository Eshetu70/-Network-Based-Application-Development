
const express =require('express');
const controller =require('../controllers/mainController')
const router =express.Router();




router.get('/about',(red, res)=>{
    res.send('send all stories')

});




module.exports =router;