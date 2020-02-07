'use strict';
/**
   * Constanten for contact data table
  */
 const mainColor = '#e88700'; //'#ef8f00';
 const modalDialogWidth = '800px'
 const httpHeader = { 'content-type': 'application/json' };
 const tHead = [
   { text: '# Id', value: 'id', align: 'left' },
   { text: 'Vorname', value: 'firstname', max: '30' },
   { text: 'Nachname', value: 'lastname', max: '30' },
   { text: 'Email', value: 'email', max: '50' },
   { text: 'Telefon', value: 'fon', max: '30' },
   { text: 'Mobil', value: 'mobil', max: '30' },
   { text: 'Strasse', value: 'street', max: '50' },
   { text: 'Postleitzahl', value: 'postcode', max: '5' },
   { text: 'Ort', value: 'place', max: '50' },
   { text: 'Alter', value: 'born' },
   { text: 'Actions', value: 'action', sortable: false },
 ]
 
 // init/reset default selected cols in table
 const tHeadDefault = [
   tHead.find(i => i.value === 'id'),
   tHead.find(i => i.value === 'firstname'),
   tHead.find(i => i.value === 'lastname'),
   tHead.find(i => i.value === 'email'),
   tHead.find(i => i.value === 'fon'),
   tHead.find(i => i.value === 'mobil'),
   tHead.find(i => i.value === 'action'),
 ];

 // init editedItems by header keys
 const setObj = cols => {
   let obj = {};
   for (let col of cols) obj[col.value] = '';
   return obj;
 }

const lableText = {
    add: 'Kontakt anlegen:',
    edit: 'Kontakt editieren: #',
    topic: 'Übersicht',
    table: 'Kontakte',
    saveRec: 'Speichern',
    cancel: 'Schließen',
    reset: 'Inhalt',
    valReset: 'Validierung',
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
    zipRuleLabel: 'Min 5 Zahlen',
    selectCols: 'Spalten auswählen',
    clearHint: 'X Standard Einstellung',
    selectHint: 'andere',
    age: ' Jahre',
    born: 'Geburtsdatum',
    alertInfo: 'info',
    alertSuccess: 'success'
  }