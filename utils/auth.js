// const uniqueIdUserMap = new Map();

const jwt = require('jsonwebtoken')
const secret = "secretKey"

function setUserId(user){
    // uniqueIdUserMap.set(id,user)
    return jwt.sign({user},secret)
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