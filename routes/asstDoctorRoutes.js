const express = require("express")

const middleware = require("../middlware/middleware")
const asstDoctorController = require("../controllers/asstDoctorController")

const asstDoctorRoute = express.Router()

asstDoctorRoute.post("/createAsstDoctor", asstDoctorController.createAsstDoctor)
asstDoctorRoute.post("/createManyAsstDoctor", asstDoctorController.createMany)
asstDoctorRoute.get("/getAsstDoctor/:id", asstDoctorController.getasstDoctor)
asstDoctorRoute.put("/updateAsstDoctor/:id", asstDoctorController.updateAsstDoctor)
asstDoctorRoute.delete("/deleteAsstDoctor/:id", asstDoctorController.deleteAsstDoctor)
asstDoctorRoute.get("/getQuery", asstDoctorController.getQuery)
asstDoctorRoute.delete("/deleteQuery", asstDoctorController.deleteQuery)
asstDoctorRoute.get("/getDoctorLookup/:id", asstDoctorController.getDoctorDetails)
asstDoctorRoute.get("/getOneAsstDetails/:id", asstDoctorController.getOneAsstDetails)
asstDoctorRoute.post("/addAsst", asstDoctorController.addAsst)
asstDoctorRoute.get("/getOneAsstDetails/:id", asstDoctorController.getOneAsstDetails)
asstDoctorRoute.put("/updateDataServices/:id", asstDoctorController.updateDataServices)
asstDoctorRoute.get("/getDataServices/:id", asstDoctorController.getDataServices)
asstDoctorRoute.delete("/deleteDataServices/:id", asstDoctorController.deleteDataServices)
asstDoctorRoute.post("/createManyServices", asstDoctorController.createManyServices)
asstDoctorRoute.put("/updateAsstDoctorSet/:id", asstDoctorController.updateAsstDoctorSet)
asstDoctorRoute.put("/asstDoctorSet/:id", asstDoctorController.asstDoctorSet)
asstDoctorRoute.get("/getAllData", middleware.auth, asstDoctorController.getAllData)

module.exports = asstDoctorRoute