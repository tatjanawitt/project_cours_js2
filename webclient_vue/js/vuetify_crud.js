'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /** 
   *  Doku, ggf labeltexte in DB
   *  Bibliotheken runterladen
   * https://vuejsdevelopers.com/2018/08/27/vue-js-form-handling-vuelidate/
   * Tabellenspalten selber wählen
   * https://stackoverflow.com/questions/58605679/how-to-show-hide-columns-of-vuetify-data-table-using-v-select-list
   * https://codepen.io/chansv/pen/PooKMNb?editors=1010
   */

  let log = console.log;
  const httpHeader = { 'content-type': 'application/json' };
  const lableText = {
    add: 'Kontakt anlegen:',
    edit: 'Kontakt editieren: #',
    topic: 'Übersicht',
    table: 'Kontakte',
    saveRec: 'Speichern',
    cancel: 'Abbrechen',
    newRec: 'Neu',
    uploadJson: 'Import',
    resetBtn: 'Daten laden',
    searchItem: 'Kontakte filtern',
    requiredField: 'Pflichtfeld',
    counter: 'eingefügte Zeichen',
    del: 'Kontakt löschen: #',
    delRec: 'Löschen',
    delQuestion: 'Wollen Sie den Kontakt wirklich löschen?',
    nameRuleLabel: 'Min 3 Zeichen',
    emailRuleLabel: 'E-mail muss gültig sein',
    zipRuleLabel: 'Min 5 Zahlen'
  }
  const tHead = [ // align: ' d-none' to hide col (blank befor must be)
    { text: '# Id', value: 'id', align: 'left'},
    { text: 'Vorname', value: 'firstname', max: '30' },
    { text: 'Nachname', value: 'lastname', max: '30' },
    { text: 'Email', value: 'email', max: '50' },
    { text: 'Telefon', value: 'fon', max: '30' },
    { text: 'Mobil', value: 'mobil', max: '30' },
    { text: 'Strasse', value: 'street', max: '50' },
    { text: 'Postleitzahl', value: 'postcode', max: '5' },
    { text: 'Ort', value: 'place', max: '50' },
    { text: 'Geburtsdatum', value: 'born', sortable: false,},
    { text: 'Actions', value: 'action', sortable: false },
  ]
  const setObj = cols => {
    let obj = {};
    for(let col of cols) obj[col.value] = '';
    return obj;
  }

  new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: vm => ({
      url: '/api/contacts',
      dialog: false,
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false, // datepiker menu
      isBirthdayMsgDisplayed: false,
      showFields: true,
      search: '',
      rowsPerPage: 5,
      value: [tHead[0],tHead[1],tHead[2],tHead[3],tHead[4],tHead[5],tHead[10]],
      selectedHeaders: [tHead[0],tHead[1],tHead[2],tHead[3],tHead[4],tHead[5],tHead[10]],
      alert: false,
      alertMsg: '',
      alertType: 'success',
      alertTimeouts: [],
      btnColor: 'rgba(78,95,187,0.8)',
      headers: [ ...tHead ],
      contacts: [],
      editedIndex: -1,
      editedItem: { ...setObj(tHead) },
      text: { ...lableText },
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
    }),

    computed: {
      formTitle() {
        if (this.showFields)
          return this.editedIndex === -1 ? this.text.add : this.text.edit;
        else return this.text.del;
      },
      computedDateFormatted: { // vm need getter and setter otherwise warn
        get: function () { return this.formatDate(this.editedItem.born); },
        set: function (val) { return this.editedItem.born; }
      },
    },

    watch: {
      dialog(val) {
        this.valid = true;
        val || this.close();
      },
      date(val) {
        this.dateFormatted = this.formatDate(this.editedItem.born)
      },
      value(val) {
        this.selectedHeaders = val;
      }
    },

    /* ---- INIT FUNCTION --------*/
    created() {
      this.initialize();
    },

    methods: {
      initialize() {
        fetch(this.url)
          .then(result => result.json())
          .then(result => {
            this.contacts = result;
            this.haveBirthday(result);
          })
          .catch(console.log)
      },


      /* ---- BIRTHDAY FUNCTIONS --------*/
      haveBirthday(list) {
        let birthday = [];
        if (this.isBirthdayMsgDisplayed) return;
        for (let item of list) {
          if (!item.born) continue;
          if (this.checkBirthdate(item.born, '-'))
            birthday.push(`${item.firstname} ${item.lastname} wird heute ${this.getAge(item.born)}`);
        }
        this.isBirthdayMsgDisplayed = true; // display once by starting web
        if (birthday.length) this.toggleAlert(birthday.join(', '), 'info');
      },

      checkBirthdate(dateYyyyMmDd, delimiter) {
        if(!dateYyyyMmDd) return false;
        const [year, month, day] = dateYyyyMmDd.split(delimiter);
        let nowDay = new Date().getDate();
        let nowMonth = new Date().getMonth() + 1;
        return (day == nowDay && month == nowMonth);
      },

      getAge(date) {
        let bornDate = new Date(date);
        let ageDifMs = Date.now() - bornDate.getTime();
        let ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      },

      /* ---- DATEPIKER FUNCTIONS --------*/
      formatDate(date) {
        if (!date) return null;
        const [year, month, day] = date.split('-');
        return `${day}.${month}.${year}`;
      },

      parseDate(date) {
        if (!date) return null;
        const [day, month, year] = date.split('.');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      },


      /* ---- IMPORT JSON FUNCTIONS --------*/
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


      /* ---- MODAL DIALOG FUNCTIONS --------*/
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


      /* ---- MODAL DIALOG ACTION-FUNCTIONS --------*/
      remove() {
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


      /* ---- ALERT FUNCTIONS --------*/
      toggleAlert(msg, typ = 'success') {
        const delTimeouts = () => {
          for (let i = 0; i < this.alertTimeouts.length; i++) {
            clearTimeout(this.alertTimeouts[i]);
          }
          this.alertTimeouts = [];
        }
        if (this.alertTimeouts.length > 0) delTimeouts();
        msg ? this.alert = true : this.alert = false;
        msg ? this.alertMsg = msg : this.alertMsg = '';
        msg.indexOf('error') != -1 ? this.alertType = 'error' : this.alertType = typ;

        this.alertTimeouts.push(setTimeout(() => {
          if (this.alert) this.alert = false;
        }, 1000 * 10));
        if (!msg && !this.alert) delTimeouts();
      },


      /* ---- MANIPULATE DATATABLE FUNCTIONS --------*/
      getEmailLink(email) {
        if (email) return 'mailto:' + email;
      }
    },
  })
})