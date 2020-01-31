'use strict'
/**
 * JQuery Start: Funktionen, Events initalisieren
 */
const TEXTTITELADD = 'Neue Adresse anlegen: ';
const TEXTTITELUPD = 'Diese Adresse ändern: ';

$(function () {
    $('#modalTitle').html(TEXTTITELADD);
    buildTable();
    upsert();
    get();
    remove();
});

/** 
 * Alle Adressen-DS in Tabelle anzeigen
 */
function buildTable() {
    let myDataTable = $('#addressTable').DataTable();

    fetch('/api/contacts').then(
        result => result.json()
    ).then(
        data => {
            if (data && data.length > 0) {                      // wenn Daten vorhanden
                myDataTable.destroy();                           // DataTable entfernen 
                $("tbody").empty();                              // Tabellenkörper leeren

                $.each(data, (i, item) => {                     // Tabellenkörper aufbauen
                    let rowData = '';                           // Tabelle aus Daten bauen
                    rowData += `<td>${item['id']}</td>`;
                    rowData += `<td>${item['firstname']}</td>`;
                    rowData += `<td>${item['lastname']}</td>`;
                    rowData += `<td>${item['street']}</td>`;
                    rowData += `<td>${item['postcode']}</td>`;
                    rowData += `<td>${item['place']}</td>`;
                    rowData += `<td>${item['email']}</td>`;
                    rowData += `<td>${item['fon']}</td>`;
                    rowData += `<td>${item['mobil']}</td>`;
                    $('<tr>').append(
                        rowData,
                        $('<td>')
                            .attr('class', 'text-right text-nowrap')
                            .append(                            // Edit Button Tabelle
                                $('<button>')
                                    .html('<i class="fa fa-edit"></i>')
                                    .attr({
                                        'type': 'button',
                                        'class': 'btn btn-warning mr-1 editBtn',
                                        'data-id11': item.id
                                    }),                              // Del Button Tabelle
                                $('<button>')
                                    .html('<i class="fa fa-trash"></i>')
                                    .attr({
                                        'type': 'button',
                                        'class': 'btn btn-warning removeBtn',
                                        'data-id22': item.id
                                    })
                            )
                    ).appendTo('tbody');
                });                                             // DataTable Bibliothek hinzufügen
                myDataTable = $('#addressTable').DataTable({
                    "order": [[0, "desc"]]
                });
            }
        }
    ).catch(
        console.log
    )
}


/**
 *  Neuen Adress-DS hinzufügen oder ändern
 */
function upsert() {
    $('#message').hide();
    $(document).on('click', '#form input[id]', (e) => { // Inhalt der Felder markieren
        $(e.currentTarget).select();
    });
    $('#modal').on('shown.bs.modal', () => {            // Abbrechen als Fokus wenn Modal geöffnet wird
        $('#closeBtn').trigger('focus');
    });
    $('#modal').keydown(function (e) {                   // Focus und Tabindex
        if ($('#closeBtn').is(":focus") && (e.which || e.keyCode) == 9) {
            e.preventDefault();
            $('#firstname').focus();
        }
    });

    $(document).on('click', '#saveBtn', (e) => {         // Modal-Speicher-Button-Event        
        let result = validateData();                     // Formular validieren
        if (result) {
            updateTable('Error: ' + result);
        } else {
            let addressObj = {}                           // valide Benutzer Eingaben holen
            $('#form input[id]').map(function () {
                addressObj[this.id] = $('#' + this.id).val();
            });

            if ($('#id').val()) {                            // Modal Adress-DS ändern   
                console.log('update ID: ', addressObj.id);
                if (typeof addressObj.id == 'string')
                    addressObj.id = Number(addressObj.id)

                fetch( new Request('/api/contacts/' + addressObj.id, {
                    method: 'put',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(addressObj)
                }))
                    .then(resp => resp.text())
                    .then(data => updateTable(data))
                    .catch(console.log)

            } else {                                        // Modal Adress-DS neu anlegen   
                console.log('create Obj: ', addressObj);
                delete addressObj['id'];

                let query = new Request(
                    '/api/contacts',
                    {
                        method: 'post',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(addressObj)
                    }
                )
                fetch(query).then(
                    resp => resp.text()
                ).then(
                    data => {
                        updateTable(data);
                        $('#form').trigger('reset');        // Felder leeren für Neuanlage
                    }
                ).catch(
                    console.log
                )
            }
        }

        function updateTable(data) {
            setAlertClass('#message', data);            // Alertklasse setzen Erfolg/Fehler
            $('#message').html(data).show();            // Erfolgsmeldung                         
            $('#modal').modal('show');                  // Modal anzeigen                                  
            buildTable();                              // Tabelle neu aufbauen
            $('#closeBtn').trigger('focus');            // Abbrechen als Fokus
            $('#modal').on('click', () => {
                $('#message').html('');                 // Meldungstext entfernen
                $('#message').hide();                   // Meldung entfernen 
                $('#closeBtn').trigger('focus');        // Abbrechen als Fokus                 
            });
        }
    });


    $(document).on('click', '#closeBtn', () => {        // Modal-Abbrechen-Button-Event
        $('#modalTitle').html(TEXTTITELADD);            // Überschrift Modal zurücksetzen
        $('#form').trigger('reset');                    // Felder leeren
        $('#message').html('');                         // Meldungstext entfernen
        $('#message').hide();                           // Meldung entfernen    
        buildTable();
    });
}


/**
 *  Einen Adress-DS holen und in Modal Dialog anzeigen
 */
function get() {
    $(document).on('click', '.editBtn', function (e) {   // Tabelle-Edit-Button-Event

        let id = $(this).attr('data-id11');             // ID aus HTML Attribute holen
        $('#modalTitle').html(TEXTTITELUPD);            // Überschrift Modal ändern
        console.log('get ID: ', id);

        $.ajax({
            url: '/api/contacts/' + id,
            method: 'get',
            success: (data) => {
                data = $.parseJSON(data);
                Object.keys(data).forEach((key) => {    // Daten in Inputfelder übernehmen
                    $('#' + key).val(data[key]);
                });
                $('#modal').modal('show');              // Modal anzeigen
            }
        });
    });
}


/**
 * Einen Adress-DS löschen
 */
function remove() {
    let id = '';
    $('#delMessage').hide();
    $('#delModal').on('shown.bs.modal', () => {                 // Abbrechen als Fokus
        $('#delCloseBtn').trigger('focus')
    });

    $(document).on('click', '.removeBtn', function () {          // Tabelle-Löschen-Button-Event

        id = $(this).attr('data-id22');                         // ID aus HTML Attribute holen
        $('#delModal').modal('show');                           // Modal anzeigen
        $('#delBody').html('Soll die Adresse mit der <b>Id '
            + id + '</b> wirklich gelöscht werden?');

        $(document).on('click', '#delBtn', (e) => {             // Modal-Löschen-Button-Event
            e.stopImmediatePropagation();                       // Mehrfach Alert Animation verhindern
            console.log('delete ID: ', id);

            let queryRequest = new Request(
                '/api/contacts/' + id,
                {
                    method: 'delete'
                }
            )
            fetch(queryRequest).then(
                antwort => antwort.text()
            ).then(
                data => {
                    console.log(data);
                    buildTable();                               // Tabelle aktualisieren
                    setAlertClass('#delMessage', data);        // Erfolgsmeldung anzeigen (animiert)
                    $('#delMessage').html(data).show(200);
                    $('#delModal').modal('hide');
                    $('#delMessage').hide(5000);
                    e.stopPropagation();
                }
            ).catch(
                console.log
            )
        });
    })

    $(document).on('click', '#delCloseBtn', () => {        // Modal-Abbrechen-Button-Event
        id = '';
    });
}

// Wenn Meldung Error hat in rot anzeigen
function setAlertClass(item, data) {
    if (data.indexOf('Error') != -1) {
        $(item).removeClass("alert-success");
        $(item).addClass("alert-danger");
    } else {
        $(item).removeClass("alert-danger");
        $(item).addClass("alert-success");
    }
}

// Plichtfelder, PLZ und Email prüfen
function validateData() {
    let txt = '';
    let fieldsToValidate = $('input[required]').map(function () {   // Zu prüfende Felder sammeln
        return {
            value: $(this).val(),
            id: $(this).attr('id')
        };
    }).get();

    for (let item of fieldsToValidate) {
        $('#' + item.id).removeClass('highlightfield');           // CSS-Klasse für Eingabefehler entfernen

        if (!item.value) {                                       // Plichtfelder prüfen  
            txt = 'Bitte füllen Sie die Plichtfelder aus!';
            $('#' + item.id).addClass('highlightfield');
            break;
        }

        if (!txt && item.id == 'postcode'                       // PLZ prüfen  
            && (isNaN(Number(item.value))
                || item.value.length < 5)) {
            txt = 'Bitte geben Sie eine gültige PLZ ein!';
            $('#' + item.id).addClass('highlightfield');
            break;
        }

        if (!txt && item.id == 'email'                          // Email prüfen  
            && (!(item.value.indexOf('@') > 0)
                || !(item.value.indexOf('.') > 0))) {
            txt = 'Bitte geben Sie eine gültige Email ein!';
            $('#' + item.id).addClass('highlightfield');
            break;
        }
    }

    return txt;
}
