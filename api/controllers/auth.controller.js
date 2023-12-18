import user from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../util/error.js";
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
        if(!validUser) return next(errorHandler(404,"User not found!"));
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,"Invalid password!"));
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const { password : pass , ...rest}=validUser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

//api route for google authentication

export const google=async (req,res,next)=> {
    try {
        const User=await user.findOne({email:req.body.email})
        if (User) {
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:pass,...rest}=User._doc
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
        } else {
            const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
            const newUser=new user({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email,password:hashedPassword,avatar:req.body.photo})
            await newUser.save();
            const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password:pass,...rest}=newUser._doc
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
        }
        
    } catch (error) {
        next(error);
    }
}