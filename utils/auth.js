// const uniqueIdUserMap = new Map();

const jwt = require('jsonwebtoken')
const secret = "secretKey"

function setUserId(user){
    // uniqueIdUserMap.set(id,user)
    return jwt.sign({
        _id:user._id,
    email:user.email,
    name:user.name,
role:user.role
},secret)
}

function getUserId(token){
    // return uniqueIdUserMap.get(id)
    if(!token){
        return null;
    }
    try{
        return jwt.verify(token,secret)
    }
    catch(error){
        return null;
    }
    
}


module.exports ={
    setUserId, getUserId
}