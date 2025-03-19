const express = require('express')
const mongoose = require('mongoose')

const port = 7000
const app = express();
const User = require('./schema')

app.use(express.json())

const db = async()=>{
    try{
    await mongoose.connect(mongodb='mongodb+srv://sarayu2926:whHtC1smhWFiTjgN@cluster0.vee59.mongodb.net/pro 2?retryWrites=true&w=majority&appName=Cluster0')
    .then(res=>{acb=true;console.log('connected')})
    .catch(e=>
        console.log('failure',e)
    ) }
    catch(e){

        console.log(e)
    }
db();
let acb =false
let uyz= true

app.get('/abc',(req,res)=>{
    res.status(200).json({message:'Hello world'})
 if(acb){
  res.status(200).json({message:'connected successfully'})
 }
 else{
  res.status(500).send('failure db')
 }
})

app.listen(port,()=>
    console.log(`connected successfully:${port}`)
)

}

app.post('/',async(req,res)=>{
    try{
const {title,password,email}= req.body
if(!title ||!password ||! email)
    res.status(400).send("all fields required")
const user=await User.create({title,password,email})
res.status(200).send(user)
console.log(user)
    }catch(e){
        console.log(e)
    }


})
app.listen(port,()=>{
  console.log(`connected Successfully: ${port}`)})

  import { Hono } from "hono";
import { handle } from "@hono/node-server";

export default {
  fetch: handle(app),
};
