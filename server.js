//import express
const express = require('express');

// make an express app
const app = express();

// making server using http and express;
const server = require('http').Server(app);

// it will pick index.html
app.use(express.static('public'));

const PORT = 9000;

server.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
