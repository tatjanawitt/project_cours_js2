'use strict';
const log = console.log;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const nocache = require('nocache');
const routes = require('./api/routes');

const app = express();
app.use(morgan('dev', {  //control api status
    skip: (req, res) => res.statusCode < 1
}));

//app.use( express.static ('webclient_jquery' , {   // DataTable JS-Kurs 1
app.use(express.static('webclient_vue', {           // DataTable JS-Kurs 2
    extensions: ['html', 'htm'],
}));
app.use(bodyParser.json());
app.use(nocache());
app.use('/api', routes); // Präfix beim Routing

app.listen(80, err => log(err || 'Läuft!'));
