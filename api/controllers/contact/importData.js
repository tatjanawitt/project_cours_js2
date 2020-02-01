'use strict';
const formidable = require('formidable');
const fs = require('fs');
const Contact = require('../../model/contact');
const couchDb = require('../../couchDb');


module.exports = (req, res) => {

    let db = couchDb.use(new Contact().dbName);
    let pfadUpload = 'uploads/';
    let importData = [];

    /* id is number, _id is string, use for _id and id the same value*/
    const findMaxId = data => {
        let ids = [];
        data.forEach(doc => doc.id ? ids.push(Number(doc.id)) : false);
        return data.length ? Math.max(...ids) : 0;
    }

    const manageMaxId = (content, maxId) => {
        let data = [];
        for (let item of content) {
            maxId += 1;
            data.push(addId(item, maxId));
        }
        return data;
    }

    const addId = (data, maxId) => {
        let newObj = new Contact({ id: maxId, ...data });
        newObj['_id'] = '' + newObj.id;
        return newObj;
    }

    const saveAll = data => {
        db.bulk({ docs: data })
            .then(() => res.send('Daten gespeichert!'))
            .catch(err => res.send(`Error: ${err}`));
    }

    //importData  
    const importToDB = importData => {
        db.list()
            .then(body => findMaxId(body.rows))
            .then(maxId => manageMaxId(importData, maxId))
            .then(data => saveAll(data))
            .catch(err => res.send(`Error: ${err}`));
    }

    const rename = datei => {
        return new Promise((resolve, reject) => {
            let alt = datei.path;
            //let original = pfadUpload + datei.name;
            console.log(alt);

            fs.readFile(alt, (err, data) => {
                if (err) reject(err);
                resolve(JSON.parse(data));
            });
            /*
                        fs.rename(alt, original, err => {
                            if (err) reject(err);
                            else resolve();
                        })*/
        });
    }


    // VIRTUELLE PFADE
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = pfadUpload;
    form.multiples = true;

    form.parse(req, (err, fields, uploadFiles) => {
        if (err) console.log(err);
        else {
            let files = uploadFiles.fileimport; // console.log(files);
            if (!Array.isArray(files)) files = [files];

            let promises = [];
            files.forEach(file => {
                promises.push(
                    rename(file)
                );
            })
            Promise.all(promises)
                .then(erg => importToDB(erg[0]))
                .then(() => console.log('ok'))
                .catch(console.log)

        }
    })
};
