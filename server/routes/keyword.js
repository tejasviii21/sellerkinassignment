const express = require('express')
const { updateVolume, getAllKeywords, getKeywordsOfMonth, getKeywordWithMonths } = require('../controllers/keyword.js')
const keywordRouter = express.Router()

keywordRouter.post('/api/keywordcount', updateVolume);
keywordRouter.get('/api/allkeywords', getAllKeywords);
keywordRouter.get('/api/keywords/:keyword', getKeywordWithMonths);
keywordRouter.get('/api/monthlysearch/:month', getKeywordsOfMonth);

module.exports = keywordRouter;