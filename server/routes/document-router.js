const express = require('express')

const DocumentCtrl = require('../controllers/document-ctrl')

const router = express.Router()

router.post('/document', DocumentCtrl.saveDocument)

module.exports = router
