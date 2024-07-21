const express = require ("express")

const userrrController = require("../controllers/userrrController")

const userrrRoute = express.Router()

userrrRoute.post("/signup",userrrController.signUp)
userrrRoute.post("/login",userrrController.logIn)

module.exports = userrrRoute