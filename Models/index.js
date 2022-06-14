const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.project = require("./project");
db.card = require("./card");
db.keyword = require("./keyword");
db.plan = require("./plan");
db.invite = require("./invitation");
db.team = require("./team");


module.exports = db;