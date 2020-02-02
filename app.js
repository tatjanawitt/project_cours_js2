'use strict';
const log = console.log;

const express = require ( 'express' );
const bodyParser = require('body-parser');
const nocache = require('nocache')
const routes = require('./api/routes');

const app = express();

//app.use( express.static ('webclient_jquery' , {
app.use( express.static ('webclient_vue' , {
    extensions: ['html', 'htm'],
}));
app.use(bodyParser.json());
app.use(nocache());
app.use('/api', routes); // Präfix beim Routing

app.listen(80, err => log(err || 'Läuft!'));
