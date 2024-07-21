const express = require("express")
const patientController = require("../controllers/patientController")

const patientRoute = express.Router()

patientRoute.post("/createPatient", patientController.createPatient)
patientRoute.get("/getPatient/:id", patientController.getPatient)
patientRoute.delete("/deletePatient/:id", patientController.deletePatient)
patientRoute.put("/updatePatient/:id", patientController.updatePatient)
patientRoute.get("/getQuery", patientController.getQuery)
patientRoute.delete("/deleteQuery", patientController.deleteQuery)
patientRoute.post("/createMany", patientController.createMany)
patientRoute.get("/getPateintLookup/:id", patientController.pateintsDetails)
patientRoute.put("/patientUpdateSet/:id", patientController.patientUpdateSet)
patientRoute.put("/setPatientUpdate/:id", patientController.setPatientUpdate)

module.exports = patientRoute