

const http = require('http');
const port = 8092;
const host ='localhost'
const server = http.createServer((req, res)=>{

    // console.log('method', req.method);
    // console.log('url', req.url);
    // console.log('header', req.headers);
    res.statusCode =200;
    res.setHeader('Content-Type','text/plain');
    res.write('Hello  World');
    res.end();

});


// server.on('request', (req, res)=>{
    
//     // console.log('method', req.method);
//     // console.log('url', req.url);
//     // console.log('header', req.headers);
//    res.statusCode =200;
//     res.setHeader('Content-Type','text/plain');
//     res.write('Hello  World');
//     res.end();


// });


server.listen(port, host, ()=>{
    console.log('the server is running on port', port);
});