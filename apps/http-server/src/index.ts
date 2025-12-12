import express from "express";
import {client } from "@repo/db/client";
const app = express();
app.use(express.json())

app.get("/" , (req,res)=>{
    res.send("Hii there.....")
})

app.post("/signup" , async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await client.user.create({
        data: {
            username:username,
            password:password
        }
    });
    if(user)
    return res.json({
        message:"signup successful",
        id:user.id
    })
    return res.json({
        error:"error while signing in"
    })



})

let port = 3002;
app.listen(port , ()=>{
    console.log(`app listening to port ${port}` )
})