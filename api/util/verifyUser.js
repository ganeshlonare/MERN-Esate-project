import jwt from "jsonwebtoken";
import {errorHandler} from "./error.js";

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;

    if(!token) return errorHandler(401,"Unauthorized");

    jwt.verify(token,process.env.JWT_SECRET, (err,user)=>{
        if(err) return next(errorHandler(403,"token is not found"));

        req.user=user;
        next();
    })
}
