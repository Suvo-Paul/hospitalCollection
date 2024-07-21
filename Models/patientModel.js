const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
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
    added_by : {
        type : mongoose.Schema.Types.ObjectId
    }
}, { timestamps: true })

const patientCollection = mongoose.model("patient", patientSchema)

module.exports = patientCollection