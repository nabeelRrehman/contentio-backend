const mongoose = require("mongoose");
const keyWordSchema = require("./keywordSchema")

const keyword = mongoose.model(
    "keyword",
    keyWordSchema
);

module.exports = keyword;