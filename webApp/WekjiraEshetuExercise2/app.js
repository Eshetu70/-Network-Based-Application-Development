
const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 8080;
const host = 'localhost'
const server = http.createServer((req, res) => {

    console.log('method', req.method);
    console.log('url', req.url);
    console.log('header', req.headers);
    const q = url.parse(req.url, true);
    const filename = "./views" + q.pathname;
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404)
            res.write('Error: File not Found')
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data)
        }
        res.end();
    });

});
// Server Set-up
server.listen(port, function (err) {
    if (err) {
        console.log('something went wrong', err)
    }
    else {
        console.log('This server is running on', port);
    }
});