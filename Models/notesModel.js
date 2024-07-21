const mongoose = require("mongoose")

const notesSchena = new mongoose.Schema({
    notes_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor"
    },
    notes_for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "asstdoctors"
    },
    notes: {
        type: String
    }
}, { timestamps: true })

const noteCollection = mongoose.model("notes", notesSchena)

module.exports = noteCollection