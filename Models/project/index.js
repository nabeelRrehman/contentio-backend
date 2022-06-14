const mongoose = require("mongoose");
const projectSchema = require("./projectSchema")

const project = mongoose.model(
    "project",
    projectSchema
);

module.exports = project;