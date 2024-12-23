const { getUserId } = require("../utils/auth");

async function restrictedToLoggedInUser(req,res,next){
    console.log(req)
    const userId = req.cookies?.uuid;
    if(!userId){
        return res.redirect('/user/signin') 
    }
    const user = getUserId(userId)

    if(!user){
        return res.redirect('/user/signin')
    }
   
    req.user = user;
    next();
}

async function checkAuthentication(req,res,next){
    const userId = req.cookies?.uuid;
    const user = getUserId(userId);
    req.user = user;
    next();

}

module.exports = restrictedToLoggedInUser;