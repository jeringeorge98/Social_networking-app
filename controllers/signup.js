const jwt =require('jsonwebtoken');
const expressJwt= require('express-jwt');
require('dotenv').config();
const User =require('../models/user')

exports.signUp=async (req,res)=>{
const Userexits= await User.findOne({email:req.body.email});
if(Userexits){
    return res.status(403).json({
        error: 'Email already exists!'
    })
}
const user =await new User(req.body);
user.save((err,resp)=>{
    if(err){
          res.send({
              message:err
          })
    }
    console.log(user)
 res.status(200).json({user});
})

}

exports.signIn=async(req,res)=>{
const{email,password}=req.body;
  User.findOne({email},(err,user)=>{
      if(err || !user){
          return res.status(401).json({
              message:'User does not exist!!,Please Sign up'
          })
      }
      if(!user.authenticate(password)){
          return res.status(401).json({
              message:"Password entered is incorrect"
          })
      }
    const token =jwt.sign({id:user._id},process.env.SECRET_KEY);
    res.cookie('t',token,{expire:new Date()+1000200020})   
       const {_id,email,name}=user
       return res.status(200).json({token,user:{_id,email,name}})
  })
}

exports.signOut=async(req,res)=>{
    res.clearCookie("t");
    return res.status(200).json({message:'Signout Succesful!'})
}

exports.requireSignIn=expressJwt({
       secret:process.env.SECRET_KEY
   })