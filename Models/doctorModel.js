const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: Number
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    address: {
        type: String
    },
    patientName : {
        type : mongoose.Schema.Types.ObjectId
    },
    asstDoctorName : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "asstdoctors"
    },
    addedAsst : {
        type : mongoose.Schema.Types.ObjectId
    },
    noteDetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "notes"
    }
}, { timestamps: true })

const doctorCollection = mongoose.model("doctor", doctorSchema)

module.exports = doctorCollection