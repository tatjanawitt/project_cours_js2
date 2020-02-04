'use strict';
// https://vuetifyjs.com/en/components/data-tables
// https://vuetifyjs.com/en/components/data-tables#examples

document.addEventListener('DOMContentLoaded', () => {
  /** suchfeld leeren button
   *  emait to function
   *  geburtsdatum einbauen mit Datumsfeld
   *  Doku, ggf labeltexte in DB
   *  Bibliotheken runterladen
   */

  let log = console.log;
  const httpHeader = { 'content-type': 'application/json' };
  const lableText = {
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
    requiredField: 'Pflichtfeld',
    counter: 'eingefügte Zeichen',
    del: 'Kontakt löschen: ID#',
    delRec: 'Löschen',
    delQuestion: 'Wollen Sie den Kontakt wirklich löschen?',
    nameRuleLabel: 'Min 3 Zeichen',
    emailRuleLabel: 'E-mail muss gültig sein',
    zipRuleLabel: 'PLZ muss 5-stellige Zahl sein'
  }
  const contactObj = {
    id: '',
    firstname: '',
    lastname: '',
    street: '',
    postcode: '',
    place: '',
    email: '',
    fon: '',
    mobil: '',
  }

  new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
      url: '/api/contacts',
      dialog: false,
      showFields: true,
      search: '',
      rowsPerPage: 5,
      alert: false,
      alertMsg: '',
      alertType: 'success',
      alertTimeouts: [],
      btnColor: 'rgba(78,95,187,0.8)',
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
      editedItem: { ...contactObj },
      defaultItem: { ...contactObj },

      valid: true,
      nameRules: [
        v => !!v || lableText.requiredField,
        v => (v && v.length >= 3) || lableText.nameRuleLabel
      ],
      emailRules: [
        v => !!v || lableText.requiredField,
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || lableText.emailRuleLabel
      ],
      zipRules: [
        v => !v || /^[0-9]{5}?$/.test(v) || lableText.zipRuleLabel
      ],      
      text: {...lableText}
    }),

    computed: {
      formTitle() {
        if (this.showFields) 
          return this.editedIndex === -1 ? this.text.add : this.text.edit;
        else return this.text.del;
      },
    },

    watch: {
      dialog(val) {
        this.valid = true;
        val || this.close();
      },
    },

    created() {
      this.initialize();
    },

    methods: {
      initialize() {
        fetch(this.url)
          .then(result => result.json())
          .then(result => this.contacts = result)
          .catch(console.log)
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


      close() {
        this.showFields = true;
        this.valid = true;
        this.dialog = false;        
        this.$refs.form.reset();
        this.$refs.form.resetValidation();        
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },


      editItem(item) {
        this.editedIndex = this.contacts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },


      deleteItem(item) {
        log('delID: ', item.id);
        this.editItem(item);
        this.showFields = false;
      },


      remove(){
        log('delId: ', this.editedItem.id)
        this.connectionToApi({
          apiUrl: `${this.url}/${this.editedItem.id}`,
          method: 'delete'
        });        
        this.close();
      },


      save() {
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            log('editId: ', this.editedItem.id)
            let editContact = JSON.stringify(this.editedItem);
            this.connectionToApi({
              apiUrl: `${this.url}/${this.editedItem.id}`,
              method: 'put',
              body: editContact
            })
          }
          else {
            delete this.editedItem['id'];
            // editItem must be stringify before otherwise no data 
            let newContact = JSON.stringify(this.editedItem);
            log('newContact: ', newContact);
            this.connectionToApi({ method: 'post', body: newContact })
          }
          this.close();
        }
      },


      connectionToApi({
        apiUrl = this.url,
        method = 'get',
        headers = httpHeader,
        body = ''
      } = {}) {
        return fetch(new Request(apiUrl, {
          method: method,
          headers: headers,
          body: body ? body : ''
        }))
          .then(resp => resp.text())
          .then(data => {
            log(data);
            this.initialize();
            this.toggleAlert(data)
          })
          .catch(err => log(err));
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


      // Beispiel zum ändern von css
      getColor(email) {
        if (email) return 'rgba(78,95,187,0.8)';
        //else if (calories > 200) return 'orange'
        //else return 'green'
        return 'indigo';
      }
    },
  })
})