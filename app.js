'use strict';
const log = console.log;

const express = require ( 'express' );
const bodyParser = require('body-parser');
const nocache = require('nocache')
const routes = require('./api/controllers/routes');

const app = express();

//app.use( express.static ('webclient_jquery' , {
app.use( express.static ('webclient_vue' , {
    extensions: ['html', 'htm'],
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(nocache());
app.use('/api', routes); // Präfix beim Routing

app.listen(80, err => log(err || 'Läuft!'));
