'use strict';

const Contact = require('../../model/contact');

 /* id is number, _id is string, use for _id and id the same value*/
 const findMaxId = data => {
    let ids = [];
    data.forEach(doc => doc.id ? ids.push(Number(doc.id)) : false);
    return data.length ? Math.max(...ids) : 0;
}

const incrementId = (content, maxId) => {
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

module.exports = { findMaxId, incrementId, addId };