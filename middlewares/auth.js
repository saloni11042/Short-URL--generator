const { getUserId } = require("../utils/auth");


function checkAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    console.log(tokenCookie)
    req.user = null;
    if(!tokenCookie){
        return next()
    }
    const token = tokenCookie
    console.log(token)
    const user = getUserId(token);
    req.user = user;
    return next();

}

function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user){
            return res.redirect('/user/signin')
        }
        if(!roles.includes(req.user.role)){
            return res.end("Unauthorized")
        }
        return next()
    }
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
    next();
}

module.exports =  {checkAuthentication, Verify, restrictTo};
// module.exports ={
//     restrictedToLoggedInUser
// }