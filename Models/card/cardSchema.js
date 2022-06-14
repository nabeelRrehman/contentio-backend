const mongoose = require("mongoose");
const schemaType = require("../../Types");

const cardSchema = new mongoose.Schema({
    
    nameOnCard: {
        type: schemaType.TypeString,
        required: true
    },
    customerId: {
        type: schemaType.TypeString,
        required: true
    },
    user: {
        type: schemaType.TypeObjectId,
        ref: 'user'
    },
    cardId: {
        type: schemaType.TypeString,
        required: true
    },
    last4: {
        type: schemaType.TypeString,
        required: true
    }

}, { timestamps: true })

module.exports = cardSchema