const mongoose = require('mongoose');

const listSchema  = new mongoose.Schema({
    token:{
        type:String,
        required: true,
        // ref:"user"
    },
},{timestamps:true})

const List = mongoose.model("list", listSchema);
module.exports = List;