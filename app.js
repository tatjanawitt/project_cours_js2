'use strict';
const log = console.log;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const nocache = require('nocache');
const cors = require('cors');
const routes = require('./api/routes');

const app = express();
//const client = 'jquery'     // JS Kurs 1
//const client = 'vue'        // JS Kurs 2
const client = 'angular/src'  // JS Kurs 3

app.use(cors());
app.use(morgan('dev', {  //control api status
    skip: (req, res) => res.statusCode < 1
}));
app.use( express.static ('webclient_' + client , {
    extensions: ['html', 'htm'],
}));
app.use(bodyParser.json());
app.use(nocache());
app.use('/api', routes); // Präfix beim Routing

app.listen(3000, err => log(err || 'Läuft!'));
