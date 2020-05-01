
const mongoose =require('mongoose');
const crypto =require('crypto');
const uuidv1  = require('uuid/v1');
const userSchema= new mongoose.Schema({
 
  Username:{
      type:String,
      trim:true,
      required:true
  },
  email:{
    type:String,
    trim:true,
    required:true
},
hashed_password:{
    type:String,
    trim:true,
    required:true
},
salt:String,
created:{
type:Date,
default:Date.now,
},
updated:Date,
photo:{
data:Buffer,
contentType:String
}
})
userSchema.virtual("password")
.set(function(pass)
{
    this._password =pass;
    // time stamp
    this.salt=uuidv1();
   // encrypt function
   this.hashed_password=this.encryptpassword(pass)
})
.get(function(){
    return this._password
})
userSchema.methods={
    authenticate:function(pass){
      return this.encryptpassword(pass)===this.hashed_password
    },
encryptpassword:function(pass){
    if(!pass){
        return "";
    }
    try{
       return crypto.createHmac("sha1",this.salt)
       .update(pass)
       .digest('hex')
    }
    catch(err){
         
    };
    

    }
}

module.exports=mongoose.model("User",userSchema)