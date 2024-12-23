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

module.exports =  Verify;