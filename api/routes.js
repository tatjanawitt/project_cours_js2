'use strict';

const express = require('express');
const contactCtl = require('./controllers/contact')

const router = express.Router();

/**
 * Contacts - API- Routes
 */
// GET /api/contacts
router.get('/contacts', contactCtl.list);
// GET /api/contacts/{id}
router.get('/contacts/:id', contactCtl.show);
// POST /api/contacts
router.post('/contacts', contactCtl.create);
// PUT /api/contacts/{id}
router.put('/contacts/:id', contactCtl.update);
// DELETE /api/contacts/{id}
router.delete('/contacts/:id', contactCtl.remove);
// POST /api/uplaodFile    (json import for db)
router.post('/uploadFile', contactCtl.import);

module.exports = router;