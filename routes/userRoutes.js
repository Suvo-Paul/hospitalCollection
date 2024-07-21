const express = require ("express")

const userController = require("../controllers/userController")

const userRoute = express.Router()

userRoute.post("/createUser", userController.createUser)
userRoute.post("/signIn", userController.signIn)

module.exports = userRoute