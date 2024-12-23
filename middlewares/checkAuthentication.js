const { getUserId } = require("../utils/auth");

async function checkAuthentication(req,res,next){
    const userId = req.cookies?.uuid;
    const user = getUserId(userId);
    req.user = user;
    next();

}

module.exports =  checkAuthentication;