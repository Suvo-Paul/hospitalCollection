"use strict"

const { default: mongoose } = require("mongoose")
const doctorCollection = require("../Models/doctorModel")

const createDoctor = async (req, res) => {
    try {
        const body = req.body
        const email = req.body.email
        const data = new doctorCollection({
            ...body

        })

        const emailExists = await doctorCollection.findOne({ email: email })

        if (emailExists) {
            return res.send({
                success: false,
                status: 500,
                message: "Email already exists"
            })
        }

        const response = await data.save()
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



const getDoctor = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const response = await doctorCollection.findOne({ _id: id }, body, { new: true })

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

const deleteDoctor = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body

        const response = await doctorCollection.findByIdAndDelete({ _id: id }, body, { new: true })
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

const updateDoctor = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body

        const response = await doctorCollection.findByIdAndUpdate({ _id: id }, body, { new: true })
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

        const response = await doctorCollection.find(getQuery)
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

        const response = await doctorCollection.findByIdAndDelete(deleteQuery)

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
        const response = await doctorCollection.insertMany(body)

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

const patientDetails = async (req, res) => {
    try {
        const id = req.params.id

        const response = await doctorCollection.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "patients",
                    localField: "patientName",
                    foreignField: "_id",
                    as: "getPatients"
                }
            }
        ])

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

const getAsstDoctorDetails = async (req, res) => {
    try {
        const id = req.params.id

        const response = await doctorCollection.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "patients",
                    localField: "patientName",
                    foreignField: "_id",
                    as: "patientDetails"
                }
            },
            {
                $lookup: {
                    from: "asstdoctors",
                    localField: "asstDoctorName",
                    foreignField: "_id",
                    as: "asstDoctorDetails"
                }
            }
        ])

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

const setUpdateDoctor = async (req, res) => {
    try {
        const id = req.params.id
        const email = req.body.email
        const mobile = req.body.mobile

        const response = await doctorCollection.findByIdAndUpdate({ _id: id }, {
            $set: {
                email: email,
                mobile: mobile

            },

        }, { new: true })

        res.send({
            success: true,
            status: 200,
            message: "Data updated successfully",
            data: response
        })
    } catch (error) {
        res.send({
            success: false,
            status: 500,
            message: "Internal server error",
            data: error.message
        })
    }
}

const updateSetDoctor = async (req, res) => {
    try {
        const id = req.params.id
        const email = req.body.email
        const mobile = req.body.mobile

        const response = await doctorCollection.findById(id)

        response.email = email,
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
    createDoctor, getDoctor, deleteDoctor, updateDoctor, getQuery, deleteQuery, createMany,
    patientDetails, getAsstDoctorDetails, setUpdateDoctor, updateSetDoctor
}