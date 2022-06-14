const mongoose = require("mongoose");
const schemaType = require("../../Types");

const keyWordSchema = new mongoose.Schema({
    
    project: {
        type: schemaType.TypeObjectId,
        ref: 'project'
    },
    keywords: [{
        name: {
            type: schemaType.TypeString,
            required: true,
        },
        recommendedTitles: [{
            title: {
                type: schemaType.TypeString,
            },
            authors: [{
                type: schemaType.TypeObjectId,
                ref: 'user',
                default: []
            }],
            status: {
                type: schemaType.TypeString,
                enum: ['Complete', 'In Progress', 'Not Started'],
                default: 'Not Started'
            },
        }],
        estimatedTraffic: {
            type: schemaType.TypeNumber,
            default: 0
        }
    }],
    targetCountry: {
        type: schemaType.TypeString
    },
    user: {
        type: schemaType.TypeObjectId,
        ref: 'user'
    }

}, { timestamps: true })

module.exports = keyWordSchema