const User = require("../models/user");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

exports.userById = (req, res, next, id) => {
  const { _id } = req.body;

  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    req.profile = user;
    //console.log(req.profile,'profile')
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  console.log(req.profile, req.auth);
  const authorized = req.profile && req.auth && req.profile._id === req.auth.id;
  if (!authorized) {
    res.status(403).json({
      message: "Not authorized",
    });
  }
};

//get users
exports.getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(401).json({
        error: err,
      });
    }
    return res.status(200).json(users);
  });
};
// get single users
exports.getSingleUser = (req, res) => {
  return res.status(200).json({
    user: req.profile,
  });
};

// update profile

// exports.updateProfile=(req,res)=>{

// let user=req.profile;

// user=_.extend(user,req.body);
// user.updated=Date.now();

// user.save((err)=>{
// if(err){
//     return res.status(400).json({
//         error:err
//     })
// }
//   user.hashed_password=undefined;
//   user.salt=undefined;
//   return res.status(200).json({user})
// })

// }

exports.updateProfile = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
        console.log(err)
      res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }
    let user = req.profile;
    user = _.extend(user, fields);
    user.updated = Date.now();
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    user.save((err) => {
      if (err) {
        res.status(400).json({ error: err });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      return res.status(200).json({ user });
    });
  });
};
// to delete a user

exports.deleteUser = (req, res) => {
  let user = req.profile;
  user.remove((err) => {
    if (err) {
      res.status(400).json({
        message: err,
      });
    }
    return res.status(200).json({
      message: "User Has been deleted!!",
    });
  });
};
// to get a user photo
exports.getUserphoto=(req,res,next)=>{
    if(req.profile.photo.data){
        res.set({"Content-Type":req.profile.photo.contentType});
        return res.send(req.profile.photo.data);
    }
    return res.status(400).json({
        error:'not photo found'
    })
    
         next();
}