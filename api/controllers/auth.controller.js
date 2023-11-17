import user from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandeler } from "../util/error.js";
import jwt from "jsonwebtoken";

//api route for sign up page
export const signup=async (req,res,next)=> {
    const {username,email,password}=req.body;
    const hashpass=bcryptjs.hashSync(password,10);
    const newUser=new user({username,email,password:hashpass});
    try{
    await newUser.save();
    res.status(201).json("user created successfully");
    }catch (error) {
        next(error);
    }
};

//api route for sign up page
export const signin=async (req,res,next)=> {
    const {email,password}=req.body;
    try {
        const validUser=await user.findOne({email});
        if(!validUser) return next(errorHandeler(404,"User not found!"));
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandeler(401,"Invalid password!"));
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const { password : pass , ...rest}=validUser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}