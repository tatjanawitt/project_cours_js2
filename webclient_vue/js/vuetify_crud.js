'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const log = console.log;
  /**
   * Vue Constructor (need import vuetify_crud_config.js)
  */
  new Vue({
    el: '#app',
    vuetify: new Vuetify({ // change standard colors
      theme: { themes: { light: { primary: mainColor, secondary: mainColor, anchor: mainColor, accent: mainColor } } }
    }),
    data: vm => ({
      url: '/api/contacts',
      dialog: false,
      widthDialog: modalDialogWidth,
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu: false, // datepiker menu
      isBirthdayMsgDisplayed: false,
      showFields: true, // regulate dialog view upsert/delete
      search: '',
      rowsPerPage: 5,
      alert: false,
      alertMsg: '',
      alertType: lableText.alertSuccess,
      alertTimeouts: [],
      btnColor: mainColor,
      headers: [...tHead],
      value: [...tHeadDefault], // tHead selectable values
      selectedHeaders: [...tHeadDefault],
      contacts: [],
      editedIndex: -1,
      editedItem: { ...setObj(tHead) },
      defaultItem: { ...setObj(tHead) },
      text: { ...lableText },  //vuetify_crud_config.js
      valid: true, // form-rules
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
      window: { width: 0, height: 0 }
    }),


    computed: {
      formTitle() {
        if (this.showFields)  // dialog title upsert/del
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
        val || this.close();
      },
      date(val) {
        this.dateFormatted = this.formatDate(this.editedItem.born)
      },
      value(val) {
        this.selectedHeaders = val;
        if (this.selectedHeaders.length < 1) {
          this.selectedHeaders = [...tHeadDefault]
          this.value = [...tHeadDefault];
        };
      }
    },

    /* ---- INIT FUNCTION --------*/
    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
      this.initialize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },


    /* ----METHODS FOR DATA TABLE --------*/
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
      handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
      },
      getEmailLink(email) {
        if (email) return 'mailto:' + email;
      },



      /* ---- BIRTHDAY FUNCTIONS --------*/
      haveBirthday(list) {
        let birthday = [];
        if (this.isBirthdayMsgDisplayed) return;
        for (let item of list) {
          if (!item.born) continue;
          if (this.checkBirthdate(item.born, '-'))
            birthday.push(`${item.firstname} ${item.lastname} (${this.getAge(item.born)})`);
        }
        this.isBirthdayMsgDisplayed = true; // display once by starting web
        if (birthday.length)
          this.toggleAlert(`${birthday.join(' & ')} ${birthday.length > 1 ?
            'haben' : 'hat'} Geburtstag`, this.text.alertInfo);
      },
      checkBirthdate(dateYyyyMmDd, delimiter) {
        if (!dateYyyyMmDd) return false;
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


      /* ---- IMPORT/UPLOAD JSON FUNCTIONS --------*/
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
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      editItem(item) {
        this.showFields = true;
        this.setDialogSize(item);
      },
      deleteItem(item) {
        this.showFields = false;
        this.setDialogSize(item);
      },
      setDialogSize(item) {
        this.editedIndex = this.contacts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.showFields ? this.widthDialog = modalDialogWidth : this.widthDialog = '500px';
        this.dialog = true;
      },
      reset() {
        this.$refs.form.reset();
      },
      resetValidation() {
        this.$refs.form.resetValidation();
      },


      /* ---- MODAL DIALOG ACTION-FUNCTIONS --------*/
      remove() {
        //log('delId: ', this.editedItem.id)
        this.connectionToApi({
          apiUrl: `${this.url}/${this.editedItem.id}`,
          method: 'delete'
        });
        this.close();
      },
      save() {
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            //log('editId: ', this.editedItem.id)
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
            //log('newContact: ', newContact);
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
            //log(data);
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
      }
    }
  })
})