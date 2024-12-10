const express = require('express')
const {handleGenerateNewShortUrl,handleGetUrl,handleGetTotalVisits} = require('../controlles/url')

const router = express.Router();

router.post('/',handleGenerateNewShortUrl);
router.get('/:shortId',handleGetUrl);
router.get('/totalVisits/:shortId',handleGetTotalVisits);

module.exports = router;
