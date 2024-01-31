const mongoose = require("mongoose");
const month = require("../utils/monthCalculate");

const keywordSchema = mongoose.Schema({
    keyword: {
        type: String
    },
    volume: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    month: {
        type: String,
        default: month
    }
})

const keywordModel = mongoose.model('keywords', keywordSchema);

module.exports = keywordModel;