import user from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandeler } from "../util/error.js";

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
}