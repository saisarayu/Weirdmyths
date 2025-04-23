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


const SECRET = 'your_secret_key'; // store this in .env for production

app.use(express.json());
app.use(cookieParser());

// Dummy login route
app.post('/api/auth/login', (req, res) => {
  const { email, id } = req.body;

  // Validate inputs (simple check)
  if (!email || !id) {
    return res.status(400).json({ message: 'Email and ID required' });
  }

  // Create JWT token
  const token = jwt.sign({ email, id }, SECRET, { expiresIn: '1h' });

  // Store in HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // set to true in production with HTTPS
    maxAge: 60 * 60 * 1000, // 1 hour
    sameSite: 'strict',
  });

  res.json({ message: 'Login successful', token });
});

// Protected route example
app.get('/api/protected', (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ message: 'Access granted', user: decoded });
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
});


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
