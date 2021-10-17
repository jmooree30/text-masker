const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Document = new Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        originalText: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('documents', Document)
