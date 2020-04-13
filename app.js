const express= require('express');
const app=express();
const mongoose=require('mongoose')
const expressValidator=require('express-validator')
const dotenv= require('dotenv')
const bodyparser=require('body-parser')
dotenv.config();
const port =5000;

mongoose.connect("mongodb+srv://Jerin1:Jerin1@nodeproject-olygz.mongodb.net/test?retryWrites=true&w=majority",{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>console.log('DB connected')).catch((err)=>console.log(err))
mongoose.connection.on("error",err=>{
  console.log(err.message)
})
// get routes


// apply middleware
const morgan =require('morgan');

const postController= require('./routes')
const authRoute =require("./routes/auth")
app.use(bodyparser.json())
//app.use('/signup',authRoute)
app.use('/',postController)
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error:'Unauthorized'
    });
  }
});

//app.use(expressValidator())
// app.get("/",(req,res)=>{
//   res.send("hello")
// })
app.listen(port,()=>{console.log(`Node js api listening at port :${port}`)})
