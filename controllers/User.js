const User =require('../models/user');
const _= require('lodash');
exports.userById =(req,res,next,id)=>{
const{_id}=req.body;

 User.findById(id).exec((err,user)=>{
    if(err || !user){
       return  res.status(400).json({
            message:'User not found'
        })
    }
   req.profile=user;
   //console.log(req.profile,'profile')
   next();
})

}

exports.hasAuthorization=(req,res,next)=>{
console.log(req.profile,req.auth)
 const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
 if(!authorized){
     res.status(403).json({
         message:'Not authorized'
     })
 }

}

//get users
exports.getUsers=(req,res)=>{
    User.find((err,users)=>{
          if(err){
             return  res.status(401).json({
                  error:err
              })
          }
          return res.status(200).json({users})
    })
}
// get single users
exports.getSingleUser=(req,res)=>{
return res.status(200).json({
user:req.profile
})
}


// update profile

exports.updateProfile=(req,res)=>{

let user=req.profile;

user=_.extend(user,req.body);
user.updated=Date.now();

user.save((err)=>{
if(err){
    return res.status(400).json({
        error:err
    })
}
  user.hashed_password=undefined;
  user.salt=undefined;
  return res.status(200).json({user})
})

}

// to delete a user

exports.deleteUser=(req,res)=>{
let user=req.profile;
user.remove((err)=>{
    if(err){
        res.status(400).json({
            message:err
        })
    }
    return res.status(200).json({
        message:'User Has been deleted!!'
    })
})
}

