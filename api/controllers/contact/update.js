'use strict';

const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');

module.exports = (req, res) => {

  let contact = new Contact({ ...req.body });
  let db = couchDb.use(contact.dbName);

  /* _id and id are the same value */
  db.get(req.params.id)
    .then(rec => db.insert({ _id: rec._id, _rev: rec._rev, ...contact })
      .then(resp => res.send('Daten gespeichert!' + resp.id ))
      .catch(err => res.send(`Error: ${err}`)))
    .catch(err => res.send(`Error: ${err}`));
};
