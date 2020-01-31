'use strict';

const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');

module.exports = (req, res) => {

  /* id is number, _id is string*/
  let contact = new Contact({ id: Date.now(), ...req.body });
  let db = couchDb.use(contact.dbName);

  /* use for _id and id the same value */
  db.insert({ _id: contact.id + '', ...contact })
    .then(() => res.send('Daten gespeichert!'))
    .catch(err => res.send(`Error: ${err}`));
};
