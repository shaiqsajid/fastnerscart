let admin=function (req,res,next){
if(req.user.role===0){
    return res.send("You are not a admin....");
}
next();

}

module.exports={admin};