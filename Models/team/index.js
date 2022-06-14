const mongoose = require("mongoose");
const teamSchema = require("./teamSchema")

const team = mongoose.model(
    "team",
    teamSchema
);

module.exports = team;