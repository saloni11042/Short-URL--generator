const shortid = require('shortid');
const Url = require('../models/url')


async function handleGenerateNewShortUrl(req,res){
    const body = req.body;
    // if(!body || !body.actualUrl){
    //     return res.json({"error":"url is required"})
    // }
    console.log(req.body)
    const shortId = shortid();
    console.log(req)
    await Url.create({
        shortId:shortId,
        actualUrl: body.actualUrl,
        visitedHistory:[],
        createdBy:req.user._id
    })

    const allUrls = await Url.find({createdBy:req.user._id})
    console.log(allUrls)
    return res.render("home",{
        id:shortId,
        title:"Home Page",
        heading:"URL Shortner",
        allUrls: allUrls,
    })
}
async function handleGetUrl(req,res){
    const shortId=req.params.shortId
    const entry = await Url.findOneAndUpdate(
        {shortId},
        {
            $push:{
                visitedHistory:{timestamp:Date.now()}
            }
        }
    );
    return res.redirect(entry.actualUrl)
}

async function handleGetTotalVisits(req,res){
    const shortId = req.params.shortId;
    const result = await Url.findOne({shortId});
    return res.json({
        totalVisits: result.visitedHistory.length,
    })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetUrl,
    handleGetTotalVisits
}