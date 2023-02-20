
const express =require('express');
const morgan =require('morgan');
const fs =require('fs');
const ejs = require('ejs');
const methodOverride =require('method-override');
const eventRouter =require('./router/eventRouter');
//const mainRouter =require('./router/mainRouter');

const app = express();
let port =4000;
let host ='localhost';
app.set('view enjine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
// app.use((req, res,next)=>{
//     console.log(req.method);
//     console.log(req.url);
//     next;
// })

app.get('/',(req, res)=>{
    res.render('index.ejs');

});

app.get('/about',(req, res)=>{
    res.render('about.ejs');

});
app.get('/contact',(req, res)=>{
    res.render('contact.ejs');

});
// app.get('/event',(req, res)=>{
//     res.statusCode =200;
//     res.send('event.html');


app.use('/events',eventRouter)
//app.use('/about',mainRouter)
app.use((err, req, res, next)=>{
    // console.log(err.stack);
     if(!err.status){
         err.status =500;
         err.message =("Internal server error");
     }
         res.status(err.status);
         res.render('error.ejs',{error:err});
 });


app.listen(port, host, ()=> {
    console.log('The server is running at port', port);
});