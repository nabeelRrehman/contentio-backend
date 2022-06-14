const mongoose = require("mongoose");
const cardSchema = require("./cardSchema")

const card = mongoose.model(
    "card",
    cardSchema
);

module.exports = card;