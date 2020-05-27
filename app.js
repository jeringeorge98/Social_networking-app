const express= require('express');
const app=express();
const cors =require('cors')
const fs =require('fs');
const mongoose=require('mongoose')
const expressValidator=require('express-validator')
const dotenv= require('dotenv')
const cookieparser =require('cookie-parser')
const bodyparser=require('body-parser')
dotenv.config();
const port =process.env.PORT;

console.log(process.env.MONGOURI)
mongoose.connect(process.env.MONGOURI,{
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
app.use(cookieparser());
app.use(cors());
//app.use('/signup',authRoute)
app.get("/",(req,res)=>{
    fs.readFile('docs/api.json',(err,data)=>{
      if(err){
        res.status(400).json({
          message:'file could not be read'
        })
      }
      const docs=JSON.parse(data)
      res.json(docs)
    })
})
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
