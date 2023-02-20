
//require modules
const express =require('express');
const morgan =require('morgan');
const fs =require('fs');
const ejs = require('ejs');
const methodOverride =require('method-override');
const storyRoutes =require('./routes/storyRoutes');

//create app
const app = express();

// configure app

let port =3000;
let host ='localhost';
app.set('view enjine', 'ejs');


//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));


//set up server
// app.get('/', (req, res)=>{
//     res.render('index');
// });

app.get('/', (req, res)=>{
    res.render('index.ejs')
});
app.use('/stories', storyRoutes);


app.use((req, res, next)=>{
    let err = new Error('The server cannot locate' +req.url);
    err.status =404;
    next(err);

});


app.use((err, req, res, next)=>{
   // console.log(err.stack);
    if(!err.status){
        err.status =500;
        err.message =("Internal server error");
    }
        res.status(err.status);
        res.render('error.ejs',{error:err});
});

// start server
app.listen(port, host, ()=> {
    console.log('The server is running at port', port);
});