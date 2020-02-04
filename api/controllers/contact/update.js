'use strict';

const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');

module.exports = (req, res) => {

  let contact = new Contact({ ...req.body });
  let db = couchDb.use(contact.dbName);

  const save = data => {
    db.insert(data)
      .then(resp => res.send('# ' + resp.id +' - Daten sind geändert!' ))
      .catch(err => res.send('error: '+ err));
  }

  db.get(req.params.id)
    .then(rec => save({ _id: rec._id, _rev: rec._rev, ...contact }))
    .catch(err => res.send('error: '+ err));
};
