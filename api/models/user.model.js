import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"
    },
},{timestamps:true});

const user=mongoose.model('User',userSchema);

export default user;