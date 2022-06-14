const mongoose = require("mongoose");
const userSchema = require("./userSchema")

const user = mongoose.model(
    "user",
    userSchema
);

module.exports = user;