const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    uid: Object
}, { timestamps: true })

module.exports = mongoose.model('Notes', notesSchema);