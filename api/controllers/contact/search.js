'use strict';

const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');

module.exports = (req, res) => {

  let db = couchDb.use(new Contact().dbName);

  const query = {
    selector: {
      $or: [
        { firstname: { "$regex": '(?i)' + req.params.search } },
        { lastname:  { "$regex": '(?i)' + req.params.search } },
        { place:     { "$regex": '(?i)' + req.params.search } },
      ]
    },
    fields: ["id", "firstname", "lastname", "place", "postcode"],
    limit: 10
  };
  db.find(query)
  .then(result => res.send(JSON.stringify(result.docs)))
  .catch(err => res.send('error: ' + err))
};

