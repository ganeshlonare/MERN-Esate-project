import bcryptjs from 'bcryptjs';
import user from '../models/user.model.js'
import {errorHandler} from '../util/error.js'

export const test=(req,res)=> {
    res.send("hello world!");
};

export const updateUser= async (req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorHandler(401,"you can only update you own profile"));
     try {
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10)
        }
        
        const updatedUser= await user.findByIdAndUpdate(req.params.id,{
            $set:{
                username : req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar : req.body.avatar
            }
        },{new:true})

        const {password , ...rest} =updatedUser._doc

        res.status(200).json(rest);
     } catch (error) {
        next(error);
     }
}