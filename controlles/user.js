const User = require('../models/user');
const Url = require('../models/url');
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const {getUserId, setUserId} = require('../utils/auth');
const List = require('../models/tokenList');


async function handleCreateUser(req,res){
    const body = req.body;
    await User.create({
        name: body.name,
        email: body.email,
        password: body.password,
    })
    
    const allUrls = await Url.find({createdBy:null})
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
    const body = req.body;
    console.log(body)
    const email = body.email;
    const password = body.password;
    console.log(email)
    console.log(password)

    const user =  await User.findOne({email,password})
    console.log(user)
    if(!user){
        return res.render("signin",{error:"Invalid email or password"})
    }
    // const userId = uuidv4()
    const token = setUserId(user)
    res.cookie("uuid",token)
    console.log(token)
        return res.redirect("/test")
   
    
}

async function handleSignOut(req,res){
    const authHeader = req.headers['cookie']
    console.log(authHeader)
    const cookie = authHeader.split(';')[1]
    console.log(cookie)
    const accessToken = cookie.split('=')[1]
    console.log(accessToken)
    const checkIfListed = await List.findOne({token:accessToken})

    const newTokenList = new List({
        token:accessToken,
    })
    await newTokenList.save();
    res.end();
}
async function Verify(req,res,next){
    const authHeader = req.headers['cookie']
    console.log(authHeader)
    const cookie = authHeader.split(';')[1]
    console.log(cookie)
    const accessToken = cookie.split('=')[1]
    console.log(accessToken)
    const checkIfListed = await List.findOne({token:accessToken})
    if(checkIfListed){
        return res.json({message:"Please login again"})
    }
}

module.exports = {handleCreateUser,handleSignUp,handleSignIn,handleSignOut}