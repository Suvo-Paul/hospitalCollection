const express = require("express")
const app = express()
const dotenv = require("dotenv")
app.use(express.json())

dotenv.config()

const port = process.env.PORT || 7002
require("./db")

const doctorRoute = require("./routes/doctorRoutes")
const patientRoute = require("./routes/patientRoutes")
const asstDoctorRoute = require("./routes/asstDoctorRoutes")
const noteRoute = require("./routes/noteRoutes")
const userRoute = require("./routes/userRoutes")
const userrrRoute = require("./routes/userrrRoutes")

app.use("/api/doctor", doctorRoute)
app.use("/api/patient", patientRoute)
app.use("/api/asstDoctor", asstDoctorRoute)
app.use("/api/notes", noteRoute)
app.use("/api/user", userRoute)
app.use("/api/userrr", userrrRoute)

app.listen(port, () => {
    console.log(`Server in running on ${port}`);
})