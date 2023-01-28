

const express =require('express');
const app = express();
let port =5800;
let host ='localhost';


app.get('/', (req,res)=>{
    res.statusCode =200;
    res.end('Home Page');
})
app.listen(port,host,()=>{
    console.log('This server is running sst the port', port);
    
    
});