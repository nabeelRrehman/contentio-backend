const mongoose = require("mongoose");
const schemaType = require("../../Types/index");

const userSchema = new mongoose.Schema({
    firstName: {
        type: schemaType.TypeString,
        required: "FirstName is Required",
    },
    lastName: {
        type: schemaType.TypeString,
        required: "lastName is Required"
    },
    email: {
        type: schemaType.TypeString,
        unique: true,
        required: 'Email address is required',
    },
    profileUrl: {
        type: schemaType.TypeString,
        default: ''
    },
    team: [{
        type: schemaType.TypeObjectId,
        ref: 'team',
        default: []
    }],
    invites: [{
        type: schemaType.TypeObjectId,
        ref: 'invite',
        default: []
    }],
    card: [{
        type: schemaType.TypeObjectId,
        ref: 'card'
    }],
    password: {
        type: schemaType.TypeString,
        required: "password is Required"
    },
    country: {
        type: schemaType.TypeString,
    },
    zipCode: {
        type: schemaType.TypeString,
    }

}, { timestamps: true })

module.exports = userSchema