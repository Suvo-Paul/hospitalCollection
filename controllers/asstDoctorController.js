"use strict"

const { default: mongoose } = require("mongoose")
const asstDoctorCollection = require("../Models/asstDoctorModel")
// const doctorCollection = require("../Models/doctorModel")
const asstDoctorService = require("../services/asstDoctorServices")


const addAsst = async (req, res) => {
    try {
        const body = req.body

        const response = await asstDoctorService.addAsst(body)

        return res.send({
            success: true,
            status: 200,
            message: "Data created",
            data: response
        })
    } catch (error) {
        return res.send({
            success: true,
            status: 500,
            message: "Internal server error",
            data: error.message
        })
    }
}


const updateDataServices = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body

        const response = await asstDoctorService.updateData(id, body)

        return res.send({
            success: true,
            status: 200,
            message: "Data updated successfully",
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

const getDataServices = async (req, res) => {
    try {
        const id = req.params.id

        const response = await asstDoctorService.getData(id)
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

const deleteDataServices = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body

        const response = await asstDoctorService.deleteData(id, body)

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

// const createManyServices = async (req, res) => {
//     try {
//         const body = req.body
//         const { email } = req.body
//         const emailExists = await asstDoctorCollection.findOne({ email: email })
//         console.log('emailExits=======', emailExists);


//         if (emailExists) {
//             return res.send({
//                 success: false,
//                 status: 403,
//                 message: "Email already exists"
//             })
//         }

//         const response = await asstDoctorService.createMany(body)
//         return res.send({
//             success: true,
//             status: 200,
//             message: "Data created successfully",
//             data: response,

//         })
//     } catch (error) {
//         return res.send({
//             success: false,
//             status: 500,
//             message: "Internal server error",
//             data: error.message
//         })
//     }
// }

const createManyServices = async (req, res) => {
    try {
        const body = req.body;

        if (!Array.isArray(body) || body.length === 0) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: "Request body should be a non-empty array"
            });
        }

        const emails = body.map(record => record.email);
        const existingEmails = await asstDoctorCollection.find({ email: { $in: emails } });

        if (existingEmails.length > 0) {
            return res.status(403).send({
                success: false,
                status: 403,
                message: " emails already exist",
                existingEmails: existingEmails.map(record => record.email)
            });
        }


        const response = await asstDoctorService.createMany(body);

        return res.send({
            success: true,
            status: 200,
            message: "Data created successfully",
            data: response,
        });
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal server error",
            data: error.message
        });
    }
};


//------------------------------------------------------------------------------------------------------------//

const createAsstDoctor = async (req, res) => {
    try {
        const body = req.body
        const email = req.body.email

        const emailExists = await asstDoctorCollection.findOne({ email: email })

        if (emailExists) {
            return res.send({
                success: false,
                status: 500,
                message: "Email already exists"
            })
        }

        const response = await asstDoctorCollection.create(body)
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

const createMany = async (req, res) => {
    try {
        const body = req.body
        const response = await asstDoctorCollection.insertMany(body)

        return res.send({
            success: true,
            status: 200,
            message: "Many data created",
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

const getasstDoctor = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body

        const response = await asstDoctorCollection.find({ _id: id }, body, { new: true })

        return res.send({
            success: true,
            status: 200,
            message: "Get data Successfully",
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

const updateAsstDoctor = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body

        const response = await asstDoctorCollection.findByIdAndUpdate({ _id: id }, body, { new: true })

        return res.send({
            success: true,
            status: 200,
            message: "Upated successfully",
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

const deleteAsstDoctor = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body

        const response = await asstDoctorCollection.findByIdAndDelete({ _id: id }, body, { new: true })

        return res.send({
            success: true,
            status: 200,
            message: "Deleted successdully",
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

        const response = await asstDoctorCollection.find(getQuery)

        return res.send({
            success: true,
            status: 200,
            message: "Get data successdully",
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
        const response = await asstDoctorCollection.findByIdAndDelete(deleteQuery)

        return res.send({
            success: true,
            status: 200,
            message: "Deleted successdully",
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

const getDoctorDetails = async (req, res) => {
    try {
        const id = req.params.id

        const response = await asstDoctorCollection.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "doctors",
                    localField: "doctorName",
                    foreignField: "_id",
                    as: "DoctorDetails"
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

const getOneAsstDetails = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await asstDoctorCollection.findById(id).populate("doctorName",);

        if (!response) {
            return res.send({
                success: false,
                status: 404,
                message: "Assistant Doctor not found",
                data: null
            });
        }

        return res.send({
            success: true,
            status: 200,
            message: "Data retrieved successfully",
            data: response
        });
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal server error",
            data: error.message
        });
    }
}

const updateAsstDoctorSet = async (req, res) => {
    try {
        const id = req.params.id
        const email = req.body.email
        const mobile = req.body.mobile

        const response = await asstDoctorCollection.findByIdAndUpdate({ _id: id }, {
            $set: {
                email: email,
                mobile: mobile
            }
        }, { new: true })

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

const asstDoctorSet = async (req, res) => {
    try {
        const id = req.params.id
        const email = req.body.email
        const mobile = req.body.mobile

        const response = await asstDoctorCollection.findById(id)

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

const getAllData = async (req, res) => {
    try {
        // const body = req.body

        const response = await asstDoctorCollection.find({})

        return res.send({
            success: true,
            status: 200,
            message: "get all data successfully",
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
    createAsstDoctor, createMany, getasstDoctor, updateAsstDoctor, deleteAsstDoctor, getQuery,
    deleteQuery, getDoctorDetails, getOneAsstDetails, addAsst, updateDataServices, getDataServices,
    deleteDataServices, createManyServices, updateAsstDoctorSet, asstDoctorSet, getAllData
}