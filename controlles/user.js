const User = require('../models/user');
const Url = require('../models/url')


async function handleCreateUser(req,res){
    const body = req.body;
    await User.create({
        name: body.name,
        email: body.email,
        paassword: body.password,
    })
    const allUrls = await Url.find({})
    return res.render("home",{
        title:"Home Page",
        heading:"URL Shortner",
        allUrls: allUrls,
    })
}

async function handleSignUp(req,res){
    return res.render("signup")
}

async function handleSignIn(req,res){
    return res.render("signin")
}

module.exports = {handleCreateUser,handleSignUp,handleSignIn}