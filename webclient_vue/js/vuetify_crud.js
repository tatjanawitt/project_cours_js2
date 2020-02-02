'use strict';
// https://vuetifyjs.com/en/components/data-tables
// https://vuetifyjs.com/en/components/data-tables#examples

document.addEventListener('DOMContentLoaded', () => {
  let log = console.log;

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
        edit: 'Kontakt editieren: ID#',
        topic: 'Übersicht'
      },
      msg: {
        counter: 'eingefügte Zeichen',
        del: ' - Sollen die Daten gelöscht werden ?'
      },
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
      initialize() {
        fetch(this.url)
          .then(result => result.json())
          .then(result => this.contacts = result)
          .catch(console.log)
      },

      editItem(item) {
        this.editedIndex = this.contacts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        log('delID: ', item.id);
        if (confirm(`ID: ${item.id} ${this.msg.del}`)) {
          fetch(new Request(`${this.url}/${item.id}`, {
            method: 'delete'
          }))
            .then(antwort => antwort.text())
            .then(data => {
              console.log(data);
              this.initialize();
            })
            .catch(err => console.log(err))
        }
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      openFileDialog() {
        document.getElementById('file-upload').click();
      },

      onFileChange(e) {
        let formular = document.querySelector('#jsonfile');
        fetch(new Request('/api/uploadFile', {
          method: 'post',
          body: new FormData(formular)
        }))
          .then(res => res.text)
          .then(res => log(res))
          .catch(err => log(err))
      },

      save() {
        if (this.editedIndex > -1) 
        {
          log('editID: ', this.editedItem.id)
          fetch(new Request(`${this.url}/${this.editedItem.id}`, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(this.editedItem)
          }))
            .then(resp => resp.text())
            .then(data => { log(data);
              setTimeout(() => this.initialize(), 400)  //hack, couchdb to slow
            })
            .catch(err => log(err))
        }
        else 
        {
          log('newObj: ', this.editedItem);
          delete this.editedItem['id'];
          fetch(new Request(this.url, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(this.editedItem)
          }))
            .then(resp => resp.text())
            .then(data => { log(data);
              this.initialize();
            })
            .catch(err => log(err))
        }
        this.close()
      },
    },
  })
})