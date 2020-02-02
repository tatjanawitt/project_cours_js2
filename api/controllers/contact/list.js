'use strict';

const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');

module.exports = (req, res) => {

  let dbName = new Contact().dbName;

  const sendData = dbName => {
    const db = couchDb.use(dbName);
    db.list({ include_docs: true })
      .then(result => {
        let data = [];
        result.rows.forEach(item => data.push(item.doc));
        res.send(JSON.stringify(data));
      })
      .catch(err => res.send(`Error: ${err}`))
  }

  couchDb.list()
    .then(res => {
      if (!res.includes(dbName)) return couchDb.create(dbName)
      return;
    })
    .then(() => sendData(dbName))
    .catch(err => res.send(`Error: ${err}`));
};
