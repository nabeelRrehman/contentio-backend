const mongoose = require("mongoose");
const schemaType = require("../../Types");

const teamSchema = new mongoose.Schema({
    
    user: {
        type: schemaType.TypeObjectId,
        ref: 'user'
    },
    members: [{
        type: schemaType.TypeObjectId,
        ref: 'user',
        default: []
    }],
    project: {
        type: schemaType.TypeObjectId,
        ref: 'project',
    }

}, { timestamps: true })

module.exports = teamSchema