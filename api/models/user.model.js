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
        default:"https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
    },
},{timestamps:true});

const user=mongoose.model('User',userSchema);

export default user;