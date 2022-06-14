const mongoose = require("mongoose");
const schemaType = require("../../Types");

const projectSchema = new mongoose.Schema({
    
    title: {
        type: schemaType.TypeString,
        required: true
    },
    description: {
        type: schemaType.TypeString,
        required: true
    },
    user: {
        type: schemaType.TypeObjectId,
        ref: 'user'
    },
    team: [{
        type: schemaType.TypeObjectId,
        ref: 'user',
        default: []
    }],
    keywords: {
        type: schemaType.TypeObjectId,
        ref: 'keyword'
    }

}, { timestamps: true })

module.exports = projectSchema