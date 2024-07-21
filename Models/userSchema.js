const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, { timestamps: true })

const userCollection = mongoose.model("user", userSchema)

module.exports = userCollection