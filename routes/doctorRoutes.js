const express = require("express")

const doctorController = require("../controllers/doctorController")

const doctorRoute = express.Router()

doctorRoute.post("/createDoctor", doctorController.createDoctor)
doctorRoute.get("/getDoctor/:id", doctorController.getDoctor)
doctorRoute.delete("/deleteDoctor/:id", doctorController.deleteDoctor)
doctorRoute.put("/updateDoctor/:id", doctorController.updateDoctor)
doctorRoute.get("/getQuery", doctorController.getQuery)
doctorRoute.delete("/deleteQuery", doctorController.deleteQuery)
doctorRoute.post("/createMany", doctorController.createMany)
doctorRoute.get("/patientsDetailsLookUp/:id", doctorController.patientDetails)
doctorRoute.get("/asstDoctorDetailsLookUp/:id", doctorController.getAsstDoctorDetails)
doctorRoute.put("/setUpdateDoctor/:id", doctorController.setUpdateDoctor)
doctorRoute.put("/updateSetDoctor/:id", doctorController.updateSetDoctor)

module.exports = doctorRoute;