import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


main().then(()=> {
    console.log(`connected to MongoDB`);
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO);
}


const app=express();

app.listen(3000,()=> {
    console.log(`server is working on port 3000`);
})

app.get("/",(req,res)=> {
    res.send(`hey`);
})