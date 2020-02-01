'use strict';
// https://vuetifyjs.com/en/components/data-tables
// https://vuetifyjs.com/en/components/data-tables#examples

document.addEventListener('DOMContentLoaded', () => {

  new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: true,
          value: 'id',
        },
        { text: 'Vorname', value: 'firstname' },
        { text: 'Nachname', value: 'lastname' },
        { text: 'Strasse', value: 'street' },
        { text: 'Postleitzahl', value: 'postcode' },
        { text: 'Ort', value: 'place' },
        { text: 'Email', value: 'email' },
        { text: 'Fon', value: 'fon' },
        { text: 'Mobil', value: 'mobil' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      url: '/api/contacts',
      contacts: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        firstname: '',
        lastname: '',
        street: '',
        postcode: '',
        place: '',
        email: '',
        fon: '',
        mobil: '',
      },
      defaultItem: {
        id: '',
        firstname: '',
        lastname: '',
        street: '',
        postcode: '',
        place: '',
        email: '',
        fon: '',
        mobil: '',
      },
      title: {
        add: 'Kontakt anlegen:',
        edit: 'Kontakt editieren: ID -',
        topic: 'Übersicht'
      },
      msg: {
        counter: 'eingefügte Zeichen'
      },
      importJson: null,
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? this.title.add : this.title.edit
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },

    created() {
      this.initialize()
    },

    methods: {
      initialize() { // get table list
        fetch('/api/contacts')
          .then(result => result.json())
          .then(result => this.contacts = result)
          .catch(console.log)
      },

      editItem(item) { // get row data for modal dialog
        this.editedIndex = this.contacts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) { // delete row and refresh table
        //const index = this.contacts.indexOf(item)
        console.log('delete ID: ', item.id);
        let msg = `Sollen die Daten mit ID: ${item.id} gelöscht werden ?`;
        if (confirm(msg)) {
          fetch(new Request(`${this.url}/${item.id}`, { method: 'delete' }))
            .then(antwort => antwort.text())
            .then(data => {
              console.log(data);
              this.initialize();
            }
            ).catch(err => console.log(err))
        }
      },

      close() { // close modal dialog upsert
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      submitFiles(file){
        let formData = new FormData();
        console.log(this.importJson);
      },

      save() {  // save update or create
        if (this.editedIndex > -1) {
          console.log('update ID: ', this.editedItem.id)

          fetch(new Request(`${this.url}/${this.editedItem.id}`, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(this.editedItem)
          }))
            .then(resp => resp.text())
            .then(data => {
              console.log(data);
              setTimeout(() => this.initialize(), 400)  //hack
            }
            ).catch(err => console.log(err))
          // Object.assign(this.contacts[this.editedIndex], this.editedItem)

        } else {
          console.log('create Obj: ', this.editedItem);
          delete this.editedItem['id'];

          fetch(new Request(this.url, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(this.editedItem)
          }))
            .then(resp => resp.text())
            .then(data => {
              console.log(data);
              this.initialize();
            }
            ).catch(err => console.log(err))

          //this.contacts.push(this.editedItem)
        }
        this.close()
      },
    },
  })
})