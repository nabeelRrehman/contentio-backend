const mongoose = require("mongoose");
const schemaType = require("../../Types");

const planSchema = new mongoose.Schema({
    
    planId: {
        type: schemaType.TypeString,
    },
    amount: {
        type: schemaType.TypeNumber
    },
    title: {
        type: schemaType.TypeString
    }

}, { timestamps: true })

module.exports = planSchema