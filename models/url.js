const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique:true,
    },
    actualUrl:{
        type:String,
        required:true,
    },
    visitedHistory:[{timestamp:{type:Number}}],
    createdBy: mongoose.Schema.Types.ObjectId
},
{timestamps:true}
)

const Url = mongoose.model("url",urlSchema);

module.exports = Url;