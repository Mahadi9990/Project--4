

import  Jwt  from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken =async(req,res,next)=>{
    const token =req.cookies.access_token
    if(!token){
        return next(errorHandler(401,"Unothorize"))
    }
    Jwt.verify(token,process.env.JWTOKEN,(err,user)=>{
        if(err){
            return next(errorHandler(40,"Unothorize"))
        }
        req.user =user
        next()
    })

}