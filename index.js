const express = require('express');
const path = require('path')
const mongoose = require("mongoose");
const connectMongoDb = require('./connection')
const urlRouter = require('./routes/url')
const URL = require('./models/url')
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'))
app.use(express.static('public'));

connectMongoDb("mongodb://localhost:27017/url-shortner")
.then(()=>console.log("Mongodb Connected"));

app.use('/url',urlRouter)

app.get('/test',async (req,res)=>{
    const allUrls = await URL.find({})
    return res.render('home',{title:"Home Page",heading:"Welcome to Home Page",allUrls:allUrls})
})

app.listen(3000,()=>{
    console.log('Server started')
})