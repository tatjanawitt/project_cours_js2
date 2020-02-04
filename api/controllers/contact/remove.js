'use strict';

const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');

module.exports = (req, res) => {

  let db = couchDb.use(new Contact().dbName);

  const delRecord = (id, rev) => {
    db.destroy(id, rev)
      .then(resp => res.send('# ' + resp.id + ' - Daten sind gelöscht!'))
      .catch(err => res.send('error: '+ err));
  }

  db.get(req.params.id)
    .then(rec => delRecord(rec._id, rec._rev))
    .catch(err => res.send('error: '+ err));
};