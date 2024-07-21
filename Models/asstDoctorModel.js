const mongoose = require("mongoose")

const asstDoctorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: Number
    },
    email: {
        type: String,
        unique: true,
        // lowercase: true
    },
    address: {
        type: String
    },
    doctorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor"
    },
    notes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notes"
    },
    noteDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notes"
    }
}, { timestamps: true })

const asstDoctorCollection = mongoose.model("asstDoctor", asstDoctorSchema)

module.exports = asstDoctorCollection