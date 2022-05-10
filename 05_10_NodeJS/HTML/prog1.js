// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'content-type': 'text/html' })
//     fs.createReadStream('index.html').pipe(res)
// })

// server.listen(process.env.PORT || 3000)

const express = require('express');
const app = express();
app.get('/', function(req, res) {
    res.send('Hello World!');
});
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});