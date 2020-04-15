const mongoose =require('mongoose');
const {ObjectId}=mongoose.Schema;
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
    },
    photo:{
      data:Buffer,
        
        ContentType:String
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    created:{
        type:Date,
        default:Date.now
    }
})


module.exports= mongoose.model("Post",PostSchema);