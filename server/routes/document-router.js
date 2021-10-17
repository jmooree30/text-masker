const express = require('express')

const DocumentCtrl = require('../controllers/document-ctrl')

const router = express.Router()

router.post('/document', DocumentCtrl.saveDocument)

router.post('/maskDocument', DocumentCtrl.maskDocument)

module.exports = router
