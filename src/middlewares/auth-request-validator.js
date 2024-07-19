const { request } = require("express")

const authRequestValidator=(req,res,next)=>{
if(!req.body.email || !req.body.password){
    return res.status(400).json({
        success: false,
        data: {},
        err: {message: 'invalid request,provide complete data'}
    })
}
next();
}

module.exports=authRequestValidator;