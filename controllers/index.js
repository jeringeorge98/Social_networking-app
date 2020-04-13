const Post = require("../models/posts");
exports.getPosts = (req, res) => {
  const post =Post.find().select("body")
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

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  post.save((err,resp)=>{
    if(err){
      console.log(err)
      res.send({
        message:err
      })
    }
    else{ 
    res.status(200).json({
        post:resp
     })
     console.log("Creating Post", req.body);
 // res.send("Creating Post");
    }
  })
  
};
  