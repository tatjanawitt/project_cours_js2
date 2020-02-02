'use strict';

const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');
const getMaxId = require('./func/get_max_id');

module.exports = (req, res) => {

  let db = couchDb.use(new Contact().dbName);

  const save = data => {
    db.insert(data)
      .then(resp => res.send('Daten angelegt! ID:' + resp.id))
      .catch(err => res.send('error: '+ err));
  }

  db.list()
    .then(body => getMaxId.findMaxId(body.rows))
    .then(maxId => getMaxId.incrementId([req.body], maxId))
    .then(data => save(data[0]))
    .catch(err => res.send('error: '+ err));
};
