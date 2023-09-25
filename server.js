// var express = require('express');
// var app = express();
// var cors = require('cors');

// app.use(express.static('/public'));
// app.use(cors());

const dal = require('./dal.js')
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/account/create/:name/:email/:password', function (req, res) {
    console.log("Success!")
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
}); 

// app.get('/account/login/:email/:password', function (req, res) {
//     console.log("Success!")
//     res.send({
//         email:      req.params.email,
//         password:   req.params.password
//     })
// }) 

app.get('/account/all', function (req, res) {
    dal.all()
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        })
}) 

app.listen (8080, () => console.log('Running on port 8080'));