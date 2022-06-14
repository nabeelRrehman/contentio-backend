const mongoose = require("mongoose");
const planSchema = require("./planSchema")

const plan = mongoose.model(
    "plan",
    planSchema
);

module.exports = plan;