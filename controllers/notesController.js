"use strict"

const mongoose = require("mongoose")
const noteCollection = require("../Models/notesModel")

const createNotes = async (req, res) => {
    try {
        const body = req.body
        const response = await noteCollection.create(body)

        return res.send({
            success: true,
            status: 200,
            message: "Data created",
            data: response
        })
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal server error",
            data: error.message
        })
    }
}

const getNotes = async (req, res) => {
    try {
        const id = req.params.id

        // const response = await noteCollection.findById(id).populate("notes_by")

        const response = await noteCollection.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "doctors",
                    localField: "notes_by",
                    foreignField: "_id",
                    as: "notesBy"
                }
            },
            {
                $lookup: {
                    from: "asstdoctors",
                    localField: "notes_for",
                    foreignField: "_id",
                    as: "notesFor"
                }
            }
        ])

        return res.send({
            success: true,
            status: 200,
            message: "get data successfully",
            data: response
        })
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal server error",
            data: error.message
        })
    }
}



module.exports = { createNotes, getNotes }