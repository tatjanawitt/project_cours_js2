'use strict';
// https://vuetifyjs.com/en/components/data-tables
// https://vuetifyjs.com/en/components/data-tables#examples

document.addEventListener('DOMContentLoaded', () => {
  let log = console.log;
  const httpHeader = { 'content-type': 'application/json' };

  new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
      url: '/api/contacts',
      dialog: false,
      search: '',
      alert: false,
      alertMsg: '',
      alertType: 'success',
      alertTimeouts: [],
      headers: [
        { text: 'ID', value: 'id', align: 'left', sortable: true },
        { text: 'Vorname', value: 'firstname', sortable: true, max: '30' },
        { text: 'Nachname', value: 'lastname', sortable: true, max: '30' },
        { text: 'Strasse', value: 'street', sortable: false, max: '50' },
        { text: 'Postleitzahl', value: 'postcode', sortable: false, max: '5' },
        { text: 'Ort', value: 'place', sortable: true, max: '50' },
        { text: 'Email', value: 'email', sortable: true, max: '50' },
        { text: 'Fon', value: 'fon', sortable: false, max: '30' },
        { text: 'Mobil', value: 'mobil', sortable: false, max: '30' },
        { text: 'Actions', value: 'action', sortable: false },
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
      valid: true,
      nameRules: [
        v => !!v || 'Pflichtfeld',
        v => (v && v.length >= 3) || 'Min 3 Zeichen'
      ],
      emailRules: [
        v => !!v || 'Pflichtfeld',
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail muss gültig sein'
      ],
      zipRules: [
        v => (v && /^[0-9]{5}$/) || 'PLZ muss 5-stellig sein',
        v => (v && v.length <= 5) || 'Max 5 Zeichen',
      ],
      title: {
        add: 'Kontakt anlegen:',
        edit: 'Kontakt editieren: ID#',
        topic: 'Übersicht',
        table: 'Kontakte',
        saveRec: 'Speichern',
        cancel: 'Abbrechen',
        newRec: 'Hinzufügen',
        uploadJson: 'Importieren',
        resetBtn: 'Daten laden',
        searchItem: 'Tabelle filtern',
        requiredField: '* Pflichtfelder',
      },
      msg: {
        counter: 'eingefügte Zeichen',
        del: ' - Sollen die Daten gelöscht werden ?'
      },
      btnColor: 'rgba(78,95,187,0.8)',
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
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
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
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            log('editID: ', this.editedItem.id)
            fetch(new Request(`${this.url}/${this.editedItem.id}`, {
              method: 'put',
              headers: httpHeader,
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
              headers: httpHeader,
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