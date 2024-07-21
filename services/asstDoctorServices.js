"use strict"

const asstDoctorCollection = require('../Models/asstDoctorModel')

exports.addAsst = async (body) => {
    try {
        const addData = new asstDoctorCollection({ ...body })
        return addData.save()
    } catch (error) {

    }
}

exports.findOne = async (id) => {
    try {
        const findOneData = await asstDoctorCollection.findById(id).populate("doctorName")

        return findOneData
    } catch (error) {
        console.log("error====> ", error);
    }
}

exports.updateData = async (id, body) => {
    try {
        const updateData = await asstDoctorCollection.findByIdAndUpdate(id, body, { new: true });

        return updateData
    } catch (error) {
        console.log("error=============>", error);
    }
}

exports.getData = async (id) => {
    try {
        const getData = await asstDoctorCollection.findById(id)

        return getData
    } catch (error) {
        console.log("error=============>", error);
    }
}

exports.deleteData = async (id, body) => {
    try {
        const deleteData = await asstDoctorCollection.findByIdAndDelete(id, body)

        return deleteData
    } catch (error) {
        console.log("error ===========>", error);
    }
}

exports.createMany = async (body) => {
    try {
        const createMany = await asstDoctorCollection.insertMany(body)
        return createMany
    } catch (error) {
        console.log("error============>", error)
    }
}
