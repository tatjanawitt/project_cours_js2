'use strict';
// http://localhost:5984/_utils um DB selbst aufzurufen

const nano = require('nano')('http://admin:geheim@localhost:5984');
module.exports = nano.db;

