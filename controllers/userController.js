"use strict"

const userCollection = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "SECRET_KEY"

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const emailExists = await userCollection.findOne({ email: email })

        if (emailExists) {
            return res.send({
                success: false,
                status: 400,
                message: "Email already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const response = await userCollection.create({
            username: username,
            email: email,
            password: hashPassword
        })

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

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const emailExists = await userCollection.findOne({ email: email })
        if (!emailExists) {
            return res.send({
                success: false,
                status: 404,
                message: "email not found"
            })
        }

        const matchPassword = await bcrypt.compare(password, emailExists.password)

        if (!matchPassword) {
            return res.send({
                success: false,
                status: 400,
                message: "Password not matched"
            })
        }

        const token = jwt.sign({
            email: emailExists.email,
            id: emailExists._id
        }, SECRET_KEY)

        return res.send({
            success: true,
            status: 200,
            message: "Sign in successfully",
            token: token,
            data: emailExists
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

module.exports = { createUser, signIn }