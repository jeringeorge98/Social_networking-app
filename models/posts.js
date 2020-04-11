const mongoose =require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
       type:String,
       required:"Title not given",
       min:5,
       max:150
    },

    body:{
    type:String,
    required:"Body is required",
    minlength:4,
    maxlength:200
    }
})


module.exports= mongoose.model("Post",PostSchema);