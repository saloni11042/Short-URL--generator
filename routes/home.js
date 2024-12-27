const express = require('express');
const URL = require('../models/url')
const { restrictTo } = require('../middlewares/auth');

const router = express.Router();

router.get("/admin/urls",restrictTo(["ADMIN"]),async function (req,res){
    const user = req.user
    const allUrls = await URL.find({})
    return res.render('home',{title:"Home Page",heading:"Welcome to Home Page",allUrls:allUrls,userName:user.name})
})

module.exports = router;