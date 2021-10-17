const CryptoJS = require("crypto-js");
const Document = require('../models/document-model');
const mask = require('../text-masker/index');
require('dotenv').config();

saveDocument = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a document',
        })
    }

    body.originalText = CryptoJS.AES.encrypt(body.originalText, process.env.SECRET_KEY).toString();

    const document = new Document(body)

    if (!document) {
        return res.status(400).json({ success: false, error: err })
    }

    document
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: document._id,
                message: 'Document saved!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Error saving document!',
            })
        })
}

maskDocument = (req, res) => {
    const { text, keywords } = req.body;

    if (!text && !keywords) {
        return res.status(400).json({
            success: false,
            error: 'No text and keywords provided',
        })
    }

    const documentText = mask.textMasker(text, keywords);

    return res.status(200).json({
        success: true,
        text: documentText,
    })

}

module.exports = {
    saveDocument,
    maskDocument
}
