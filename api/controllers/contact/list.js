'use strict';

const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');

module.exports = (req, res) => {

  /* get db name from model */
  let dbName = new Contact().dbName;

  /* check if db exists otherwise create it*/
  couchDb.list()
    .then(res => {
      if (!res.includes(dbName)) return couchDb.create(dbName)
      else return true;
    })
    .then(() => sendData(dbName))
    .catch(err => console.log(err))

  /* if db exists, get list of data and send to client */  
  const sendData = dbName => {
    const db = couchDb.use(dbName);
    db.list({ include_docs: true })
      .then(result => {
        let data = [];
        result.rows.forEach(item => data.push(item.doc));
        res.send(JSON.stringify(data));
      })
      .catch(err => res.send('Fehler beim Laden der Daten: ' + err))
  }
};
