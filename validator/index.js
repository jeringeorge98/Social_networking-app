//const {check,validationResult}= require('express-validator')


exports.createPostValidator=(req,res,next)=>{
req.check("title","Write a title").notEmpty();
req.check("title","Title must be between 4 and 500").isLength({
    min:4,
    max:150
});
//body
req.check("body","Write a body").notEmpty();
req.check("body","Body length not  enough").isLength({
    min:4,
    max:200
})
const errors=req.validationErrors();
if(errors){
    const firstError=errors.map(err=>err.msg)[0];
    return res.status(400).json({error:firstError})
}
// proceed to next middleware
next();
}
exports.createPostValidator=(req,res,next)=>{
req.check("title","Write a title").notEmpty();
req.check("title","Title must be between 4 and 500").isLength({
    min:4,
    max:150
});
//body
req.check("body","Write a body").notEmpty();
req.check("body","Body length not  enough").isLength({
    min:4,
    max:200
})
const errors=req.validationErrors();
if(errors){
    const firstError=errors.map(err=>err.msg)[0];
    return res.status(400).json({error:firstError})
}
// proceed to next middleware
next();
}
// validator for user signUp
exports.SignUpValidator=(req,res,next)=>{
    // name is not null and between 4 and 10 characheters
    req.check("Username","Name is empty or too short").notEmpty();
   // for email
    req.check("email","Not right email")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min:4,
        max:2000
    }) 
    req.check("password","Password required!!")
    .notEmpty()
    .isLength({
        min:6,
        max:2000
    })
    .withMessage("Password length is too small")
   // errors
    const errors=req.validationErrors();
    if(errors){
        const firstError=errors.map(err=>err.msg)[0];
        return res.status(400).json({error:firstError})
    }
    // proceed to next middleware
    next();


}