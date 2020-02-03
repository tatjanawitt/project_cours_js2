'use strict';

const fs = require('fs');
const formidable = require('formidable');
const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');
const getMaxId = require('./func/get_max_id');


module.exports = (req, res) => {

    let db = couchDb.use(new Contact().dbName);
    let pfadUpload = 'uploads/';

    const saveAll = data => {
        db.bulk({ docs: data })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    const importToDB = importData => {
        db.list()
            .then(body => getMaxId.findMaxId(body.rows))
            .then(maxId => getMaxId.incrementId(importData, maxId))
            .then(data => saveAll(data))
            .catch(err => console.log(err));
    }

    const fileToObj = datei => {
        return new Promise((resolve, reject) => {
            fs.readFile(datei.path, (err, data) => {
                if (err) reject(err);
                resolve(JSON.parse(data));
            });
        });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = pfadUpload;
    form.multiples = true;

    form.parse(req, (err, fields, uploadFiles) => {
        if (err) console.log(err);
        else {
            let files = uploadFiles.fileimport;
            if (!Array.isArray(files)) files = [files];

            let promises = [];
            files.forEach(file => promises.push(fileToObj(file)))
            Promise.all(promises)
                .then(res => importToDB(res[0]))
                .then(() => res.send('Daten sind in die Tabelle importiert!'))
                .catch(err => res.send('error: '+ err))
        }
    })
};
