const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
const connectMongoDb = require('./connection')
const URL = require('./models/url')
const USER = require('./models/user')
const restrictedToLoggedInUser = require('./middlewares/auth')
const checkAuthentication = require('./middlewares/checkAuthentication')
const Verify = require('./middlewares/Verify')

const urlRouter = require('./routes/url')
const userRouter = require('./routes/user')

const app = express();

connectMongoDb("mongodb://localhost:27017/url-shortner")
.then(()=>console.log("Mongodb Connected"));

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static('public'));

app.use('/url',restrictedToLoggedInUser,urlRouter)
app.use('/user',userRouter)

app.use('/test', checkAuthentication,async (req,res)=>{
    const user = req.user
    console.log(req)
    console.log(req.user)
    const allUrls = await URL.find({createdBy:user._id})
    // const currentUser = await USER.findOne({email:req.user.email})
    // console.log(req.user.user.name)
    // console.log(currentUser.user)
    return res.render('home',{title:"Home Page",heading:"Welcome to Home Page",allUrls:allUrls,userName:req.user.user.name})
})

// app.use('/',checkAuthentication,async (req,res)=>{
//     const allUrls = await URL.find({createdBy:req.user._id})
//     return res.render('home',{title:"Home Page",heading:"Welcome to Home Page",allUrls:allUrls,userName:req.user.user.name})
// })

app.use((req,res)=>{
    res.render('404',{title:"Page not Found"})
})

app.listen(3000,()=>{
    console.log('Server started')
})