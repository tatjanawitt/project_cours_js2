'use strict';
const log = console.log;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const nocache = require('nocache');
const cors = require('cors');
const routes = require('./api/routes');

const app = express();

app.use(cors());
app.use(morgan('dev', {  //control api status
    skip: (req, res) => res.statusCode < 1
}));

//app.use( express.static ('webclient_jquery' , {   // DataTable JS-Kurs 1
app.use(express.static('webclient_vue', {           // DataTable JS-Kurs 2
//app.use( express.static ('webclient-angular/src' , {   // DataTable JS-Kurs 3   
    extensions: ['html', 'htm'],
}));
app.use(bodyParser.json());
/* app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, content-type');
    next();
});*/
app.use(nocache());
app.use('/api', routes); // Präfix beim Routing

app.listen(3000, err => log(err || 'Läuft!'));
