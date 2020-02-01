'use strict';

const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');

module.exports = (req, res) => {

  let db = couchDb.use(new Contact().dbName);

  /* id is number, _id is string, use for _id and id the same value*/
  const findMaxId = data => {
    let ids = [];
    data.forEach(doc => doc.id ? ids.push(Number(doc.id)) : false);
    return data.length ? Math.max(...ids) : 0;
  }

  const manageMaxId = (content, maxId) => {
    let data = [];    
    for (let item of content) {
      maxId += 1;
      data.push(addId(item, maxId));
    }
    return data;
  }

  const addId = (data, maxId) => {
    let newObj = new Contact({ id: maxId, ...data });
    newObj['_id'] = '' + newObj.id;
    return newObj;
  }

  const saveAll = data => {
    db.bulk({ docs: data })
      .then(() => res.send('Daten gespeichert!'))
      .catch(err => res.send(`Error: ${err}`));
  }

  const saveOne = data => {
    db.insert(data)
      .then(() => res.send('Daten gespeichert!'))
      .catch(err => res.send(`Error: ${err}`));
  }

  let isOne = !Array.isArray(req.body);
  db.list()
    .then(body => findMaxId(body.rows))
    .then(maxId => manageMaxId(isOne ? [req.body] : req.body, maxId))
    .then(data => isOne ? saveOne(data[0]) : saveAll(data))
    .catch(err => res.send(`Error: ${err}`));
};
