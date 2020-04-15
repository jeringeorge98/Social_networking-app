const Post = require("../models/posts");
const formidable =require('formidable');
const fs =require('fs')
// retrieve posts
exports.getPosts = (req, res) => {
  const post =Post.find()
  .populate("postedBy","_id Username")
  .select("body  created")
  .then((posts)=>{
    res.status(200).json({
      posts,
    }
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