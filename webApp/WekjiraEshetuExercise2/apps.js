

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
let port = 5800;
let host = 'localhost';
app.use(express.urlencoded({extended: true}));

let student =[{id: 1, name:'Alice', major:'Computer Science'},
{id: '2', name:'Brik', major:'Computer Science'},
{id: '3', name:'Jason', major:'Computer Science'},
{id: '4', name:'Daniel', major:'Computer Science'}
];

app.use((req, res, next)=>{
    console.log(req.method);
    console.log(req.url);
    next();
});

 app.use(morgan('tiny'));
app.get('/',(req,res)=>{
    res.sendFile('./views/404.html',{root:__dirname});
});

app.get('/student',(req, res)=>{
    res.json(student);
});
app.post('/student',(req,res)=>{
   console.log(req.body);
    let students = req.body;
    students.id = uuidv4();
    student.push(students);
    //res.redirect('/student');
    res.redirect('/about');
});
app.get('/student/create', (req, res) => {
    //res.statusCode = 200;
   // res.end('Home Page');
   res.sendFile('./views/form.html',{root:__dirname});
});
app.get('/student/:sid',(req, res)=>{
    let id= req.params.sid;
    //let students =student.find(element=>element.id === parseInt(id)); // if id is integer
    let students =student.find(element=>element.id === id); //if id is string
    res.json(students);
});


app.get('/about', (req, res) => {
    //res.send('/views/about.html');
    console.log(req.url);
    console.log(req.query);
    //console.log(__dirname);
    res.sendFile('./views/about.html',{root:__dirname});
});
app.get('/contact', (req, res) => {
    res.sendFile('./views/contact.html',{root:__dirname});
});
app.get('/404/', (req, res) => {
    res.sendFile('./views/404.html',{root:__dirname});
});

app.listen(port, host, () => {
    console.log('This server is running sst the port', port);


});