const mongoose = require("mongoose");
const schemaType = require("../../Types");

const invitationSchema = new mongoose.Schema({
    
    user: {
        type: schemaType.TypeObjectId,
        ref: 'user'
    },
    privateNote: {
        type: schemaType.TypeString
    },
    email: {
        type: schemaType.TypeString
    },
    project: {
        type: schemaType.TypeObjectId,
        ref: 'project'
    },
    status: {
        type: schemaType.TypeString,
        default: 'pending',
        enum: ['pending', 'accepted']
    }

}, { timestamps: true })

module.exports = invitationSchema