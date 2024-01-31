const ErrorHandler = require('../utils/ErrorHandler.js')
const asyncErrorHandler = require('../middlewares/asyncErrorHandler.js');
const keywordModel = require('../models/keyword.js');
const month = require('../utils/monthCalculate.js');


const updateVolume = asyncErrorHandler(
    async (req, res, next) => {
        var { keyword } = req.body;
        keyword = keyword.toLowerCase();

        const keywordDoc = await keywordModel.findOne({ keyword, month });      // keyword in month-> January != keyword in month-> February

        if (!keywordDoc) {          
            var newKeyword = new keywordModel({ keyword, volume: 1 });          // saving newly searched keyword to `keyword` collection
            await newKeyword.save();

            res.status(201).json({
                success: true,
                message: "new keyword added to doc",
                keyword: newKeyword
            })

        } else {
            var clickCount = keywordDoc.volume;         // this else{} block will only run to increment the search volume of an already search keyword 
            clickCount++;

            const updateClickCount = await keywordModel.findByIdAndUpdate(keywordDoc._id, { volume: clickCount }, { new: true });

            res.status(200).json({
                success: true,
                message: "keyword volume count updated",
                keywordDoc: updateClickCount
            })
        }
    }
)

const getAllKeywords = asyncErrorHandler(
    async (req, res, next) => {
        const allKeywords = await keywordModel.find();
        res.status(200).json({
            success: true,
            keywords: allKeywords
        })
    }
)

const getKeywordsOfMonth = asyncErrorHandler(       // get keywords, searched in a single Month (Month wise searching)
    async(req, res) => {
        const { month } = req.params;
        const allKeywords = await keywordModel.find({ month });
        res.status(200).json({
            success: true,
            keywords: allKeywords,
        })
    }
)

const getKeywordWithMonths = asyncErrorHandler(    // get details of a single keyword (in which month it was searched how many times)  
    async(req, res) => {
        var { keyword } = req.params;
        keyword = keyword.toLowerCase();
        const allKeywords = await keywordModel.find({ keyword });
        res.status(200).json({
            success: true,
            keywords: allKeywords,
        })
    }
)


module.exports = { updateVolume, getAllKeywords, getKeywordsOfMonth, getKeywordWithMonths };