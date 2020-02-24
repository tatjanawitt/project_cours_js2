'use strict';
const couchDb = require('../couchDb');

class Contact {
  constructor({
    id = "-1",
    firstname = "",
    lastname = "",
    email = "",
    street = "",
    postcode = "",
    place = "",
    fon = "",
    mobil = "",
    born = "",
    img = ""
  } = {}) {
      this.id = id,
      this.firstname = firstname,
      this.lastname = lastname,
      this.email = email,
      this.street = street,
      this.postcode = postcode,
      this.place = place,
      this.fon = fon,
      this.mobil = mobil,
      this.born = born,
      this.img = img
  }

  get dbName() {
    return 'contact';
  }
}
module.exports = Contact;
