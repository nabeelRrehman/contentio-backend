const mongoose = require("mongoose");
const invitationSchema = require("./invitationSchema")

const invitation = mongoose.model(
    "invite",
    invitationSchema
);

module.exports = invitation;