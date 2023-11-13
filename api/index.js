import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
dotenv.config();

main().then(()=> {
    console.log(`connected to MongoDB`);
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO);
}

const app=express();
app.use(express.json());

app.listen(3000,()=> {
    console.log(`server is working on port 3000`);
})

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
