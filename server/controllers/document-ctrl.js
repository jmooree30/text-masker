const CryptoJS = require("crypto-js");
const Document = require('../models/document-model');
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

    let documentText = text;

    // split keywords into an array of individual chars (["t","h","e"])
    let splitKeywords = keywords.split("");

    // Transform any phrases that use single quotes to use double quotes
    // This will prevent any words that have apostrophes in them causing issues

    // If the current char is a ' then check the char before and after to determine if its a quote or // apostrophe
    splitKeywords.forEach((e, i) => {
        if (e === `'`) {
            if (i === 0 ||
                i === keywords.split("").length - 1 ||
                !keywords[i - 1].match(/[^,\s?]+/g) ||
                !keywords[i + 1].match(/[^,\s?]+/g)) {
                splitKeywords[i] = `"`;
            }
        }
    })

    // Array of all extracted phrases
    const extractedPhrases = splitKeywords.join("").split(`"`).filter((subStr, i) => {
        if (i % 2) return subStr;
    })

    // Array of all extracted words
    const extractedWords = splitKeywords.join("").split(`"`).filter((subStr, i) => {
        if (!(i % 2)) return subStr;
    }).join("").split(/[ ,]+/).filter(e => e)

    // Concatenate words and phrases together
    const cleanedText = extractedPhrases.concat(extractedWords);

    // Replace matches in text with the extracted keywords & phrases
    cleanedText.forEach(key => {

        // Get all occurrences (g), case insensitive (i), isn't a word within another word (\\b)
        const reg = new RegExp(`\\b${key}\\b`, 'gi');

        documentText = documentText.replace(reg, "XXXX");

    })

    return res.status(200).json({
        success: true,
        text: documentText,
    })

}

module.exports = {
    saveDocument,
    maskDocument
}
