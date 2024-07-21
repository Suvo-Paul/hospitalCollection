"use strict"

const patientCollection = require("../Models/patientModel")
const mongoose = require("mongoose")
const createPatient = async (req, res) => {
    try {
        const body = req.body
        const email = req.body.email

        const emailExists = await patientCollection.findOne({ email: email })

        if (emailExists) {
            return res.send({
                success: false,
                status: 400,
                message: "Email already exists"
            })
        }

        const response = await patientCollection.create(body)
        return res.send({
            success: true,
            status: 200,
            message: "Data created successfully",
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

const getPatient = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const response = await patientCollection.find({ _id: id }, body, { new: true })

        return res.send({
            success: true,
            status: 200,
            message: "Get data successfully",
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

const deletePatient = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body

        const response = await patientCollection.findByIdAndDelete({ _id: id }, body, { new: true })
        return res.send({
            success: true,
            status: 200,
            message: "Delete doctor",
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

const updatePatient = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body

        const response = await patientCollection.findByIdAndUpdate({ _id: id }, body, { new: true })
        return res.send({
            success: true,
            status: 200,
            message: "Update data successfully",
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

const getQuery = async (req, res) => {
    try {
        const getQuery = req.query

        const response = await patientCollection.find(getQuery)
        return res.send({
            success: true,
            status: 200,
            message: "Get data successfully",
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

const deleteQuery = async (req, res) => {
    try {
        const deleteQuery = req.query._id

        const response = await patientCollection.findByIdAndDelete(deleteQuery)

        return res.send({
            success: true,
            status: 200,
            message: "Delete data successfully",
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

const createMany = async (req, res) => {
    try {
        const body = req.body
        const response = await patientCollection.insertMany(body)

        return res.send({
            success: true,
            status: 200,
            message: "Data created successfully",
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

const pateintsDetails = async (req, res) => {
    try {
        const id = req.params.id
        const getAllPateints = await patientCollection.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "doctors",
                    localField: "added_by",
                    foreignField: "_id",
                    as: "Doctor_details"
                }
            }

        ]);
        return res.send({
            success: true,
            status: 200,
            message: "Get successfully",
            data: getAllPateints
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

const patientUpdateSet = async (req, res) => {
    try {
        const id = req.params.id
        const mobile = req.body.mobile
        const email = req.body.email

        const response = await patientCollection.findByIdAndUpdate({ _id: id }, {
            $set: {
                mobile: mobile,
                email: email
            }
        }, { new: true })

        return res.send({
            success: true,
            status: 200,
            message: "Get successfully",
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

const setPatientUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const email = req.body.email
        const mobile = req.body.mobile

        const response = await patientCollection.findById(id)

        response.email = email
        response.mobile = mobile

        await response.save()

        return res.send({
            success: true,
            status: 200,
            message: "Get data successfully",
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

module.exports = {
    createPatient, getPatient, deletePatient, updatePatient, getQuery, deleteQuery, createMany, pateintsDetails
    , patientUpdateSet, setPatientUpdate
}