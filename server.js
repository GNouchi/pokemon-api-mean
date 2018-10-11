const express = require('express');
const app  = express();

app.use(express.static( __dirname + '/pokemon/dist/pokemon' ));

app.listen(8000,(err=>
    err ? console.log(err) : console.log('listening on 8000 ==>')
))