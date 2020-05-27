const Post = require("../models/posts");
const _= require('lodash')
const formidable =require('formidable');
const fs =require('fs')


// to update a post

exports.updatePost =(req,res)=>{
let post=req.post
 post = _.extend(post,req.body)
 post.updated =Date.now();
 post.save((err,result)=>{
  if(err){
    res.status(400).json({
      err:err
    })
  }
res.json(result)

})

}

// to delete a post

exports.deletePost =(req,res)=>{
let post =req.post;
post.remove((err,resp)=>{
  if(err){
    return res.status(400).json({
      error:err
    })
  }
  return res.json({
    message:'Your Post has been succesfully deleted!'
  })
})

}

// to check if the user is deleting the post he/she created
exports.checkPoster=(req,res,next)=>{
// console.log(req.post,"Post")
// console.log(req.post.postedBy._id,"id")
// console.log(req.auth.id,"auth id")
// console.log(req.auth,"Auth")
let checkPoster = req.auth && req.post && req.post.postedBy._id ==req.auth.id;
if(!checkPoster){
  return res.status(403).json({
    error:"User not authorised"
  })
}
next();
}


// retrieve post by the particular id

exports.postById =(req,res,next,id)=>{
Post.findById(id)
.populate("postedBy","_id name")
.exec((err,results)=>{
if(err || !results){
res.status(400).json({
  error:"Could not find the post"
})
}
req.post=results;
next();

})


}





// retrieve posts
exports.getPosts = (req, res) => {
  const post =Post.find()
  .populate("postedBy","_id Username")
  .select("body title created")
  .then((posts)=>{
    res.status(200).json(
      posts
    
    )
  }).catch((err)=>{
    res.send(err)
  })

};
exports.Test = (req, res) => {
   res.send("Test from Node.js!!!");
 };




// creating Post
 exports.createPost = (req, res,next) => {
  //const post = new Post(req.body);
  let form =new formidable.IncomingForm()
  form.keepExtensions=true;
  
  form.parse(req,(err,fields,files)=>{
    if(err){
      return res.status(400).json({
        error:err
      })
    }
    let post= new Post(fields);
    post.postedBy=req.profile;
    if(files.photo){
    post.photo.data=fs.readFileSync(files.photo.path)
    post.photo.ContentType=files.photo.type
    }
    post.save((err,resp)=>{
      if(err){
        console.log(err)
        res.send({
          message:err
        })
      }
      res.json(resp)  
    })
 })
};
  
// get posts by user

exports.postByUser=(req,res)=>{

Post.find({postedBy:req.profile._id})
.populate("postedBy","_id name")
.sort("_created")
.exec((err,result)=>{
  if(err){
    res.status(400).json({
      message:err
    })
  }
  res.json(result);
});

}