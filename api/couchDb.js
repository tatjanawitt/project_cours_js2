'use strict';

const nano = require('nano')('http://admin:geheim@localhost:5984');
module.exports = nano.db;

