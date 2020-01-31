'use strict';

const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');

module.exports = (req, res) => {

  let db = couchDb.use(new Contact().dbName);

  /* _id and id are the same value */
  db.get(req.params.id)
    .then(data => res.send(JSON.stringify(data)))
    .catch(err => res.send(`Error: ${err}`));
};
