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
      alert: false,
      alertMsg: '',
      alertType: 'success',
      alertTimeouts: [],
      headers: [
        { text: 'ID', value: 'id', align: 'left' },
        { text: 'Vorname', value: 'firstname' },
        { text: 'Nachname', value: 'lastname' },
        { text: 'Strasse', value: 'street', sortable: false },
        { text: 'Postleitzahl', value: 'postcode', sortable: false },
        { text: 'Ort', value: 'place' },
        { text: 'Email', value: 'email' },
        { text: 'Fon', value: 'fon', sortable: false },
        { text: 'Mobil', value: 'mobil', sortable: false },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      url: '/api/contacts',

      valid: true,
      nameRules: [
        v => !!v || 'Pflichtfeld',
        v => (v && v.length >= 3) || 'Min 3 Zeichen',
        v => (v && v.length <= 25) || 'Max 25 Zeichen',
      ],

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
        topic: 'Übersicht',
        table: 'Kontakte',
        saveRec: 'Speichern',
        cancel: 'Abbrechen',
        newRec: 'Hinzufügen',
        uploadJson: 'Importieren',
        searchItem: 'Tabelle filtern'
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
      // Beispiel zum ändern von css
      getColor(email) {
        if (email) return 'rgba(78,95,187,0.8)';
        //else if (calories > 200) return 'orange'
        //else return 'green'
        return 'indigo';
      },

      toggleAlert(msg) {
        const delTimeouts = () => {
          for (let i = 0; i < this.alertTimeouts.length; i++) {
            clearTimeout(this.alertTimeouts[i]);
          }
          this.alertTimeouts = [];
        }
        if (this.alertTimeouts.length > 0) delTimeouts();
        msg ? this.alert = true : this.alert = false;
        msg ? this.alertMsg = msg : this.alertMsg = '';
        msg.indexOf('error') != -1 ? this.alertType = 'error' : this.alertType = 'success';

        this.alertTimeouts.push(setTimeout(() => {
          if (this.alert) this.alert = false;
        }, 1000 * 10));
        if (!msg && !this.alert) delTimeouts();
      },

      editItem(item) {
        this.editedIndex = this.contacts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        log('delID: ', item.id);
        if (confirm(`ID: ${item.id} ${this.msg.del}`)) {
          fetch(new Request(`${this.url}/${item.id}`, {
            method: 'delete'
          }))
            .then(res => res.text())
            .then(data => {
              this.initialize();
              this.toggleAlert(data);
            })
            .catch(err => log('err', err));
        }
      },

      close() {
        this.dialog = false;
        this.valid = true;
        this.$refs.formi.reset();
        this.$refs.formi.resetValidation();        
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
          .then(res => res.text())
          .then(data => {
            setTimeout(() => {
              this.initialize();
              this.toggleAlert(data);
            }, 400);
          })
          .catch(err => log(err));
      },

      save() {
        if (this.$refs.formi.validate()) {
          if (this.editedIndex > -1) {
            log('editID: ', this.editedItem.id)
            fetch(new Request(`${this.url}/${this.editedItem.id}`, {
              method: 'put',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(this.editedItem)
            }))
              .then(resp => resp.text())
              .then(data => {
                setTimeout(() => {
                  this.initialize();
                  this.toggleAlert(data);
                }, 400);
              })
              .catch(err => log(err));
          }
          else {
            log('newObj: ', this.editedItem);
            delete this.editedItem['id'];
            fetch(new Request(this.url, {
              method: 'post',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(this.editedItem)
            }))
              .then(resp => resp.text())
              .then(data => {
                this.initialize();
                this.toggleAlert(data);
              })
              .catch(err => log(err));
          }
          this.close();
        }
      },
    },
  })
})