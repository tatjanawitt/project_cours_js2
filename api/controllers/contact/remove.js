'use strict';

const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');

module.exports = (req, res) => {

  let db = couchDb.use(new Contact().dbName);
  
  /* _id and id are the same value */
  db.get(req.params.id)
    .then(rec => db.destroy(rec._id, rec._rev))
      .then(resp => res.send('Daten von <b>ID: ' + resp.id + '</b> gelöscht!'))
      .catch(err => res.send(`Error: ${err}`))
    .catch(err => res.send(`Error: ${err}`));
};