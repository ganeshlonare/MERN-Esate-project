import express from 'express';

const app=express();

app.listen(3000,()=> {
    console.log(`server is working on port 3000`);
})

app.get("/",(req,res)=> {
    res.send(`hey`);
})