const express = require("express")

const noteController = require("../controllers/notesController")

const noteRoute = express.Router()

noteRoute.post("/createNote", noteController.createNotes)
noteRoute.get("/getNotes/:id", noteController.getNotes)

module.exports = noteRoute