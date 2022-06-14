const express = require('express');
const bcrypt = require("bcryptjs");
const Config = require("../../../Config");
const jwt = require("jsonwebtoken");
const { saveNewData, getSpecificData } = require('../../../Helpers');



const signUpUser = async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const obj = {
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        };

        let userExist = await getSpecificData('user', 'email', email)
        if (userExist) {
            return res.status(400).send({ status: 400, message: 'User already exist!' })
        }
        const user = await saveNewData("user", obj);
        if (user) {
            user.password = undefined;
            var token = jwt.sign({ id: user._id }, Config.secret);
            return res.status(200).send({ status: 200, user, token: token })
        }

    } catch (e) {
        res.status({ status: 400, message: e.message });
    }
}







module.exports = signUpUser