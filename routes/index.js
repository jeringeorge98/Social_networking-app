const express= require('express');
const expressValidator =require('express-validator')

const validator =require('../validator/index')
const {getPosts,createPost,Test,postByUser}=require('../controllers')
const {hasAuthorization,userById,getUsers,getSingleUser,updateProfile,deleteUser}=require('../controllers/User')
const {signUp,signIn,signOut,requireSignIn,}=require('../controllers/signup')
const router = express.Router();
router.use(expressValidator())

// for posts
router.get('/',getPosts)
router.post('/post/new/:userId',requireSignIn,createPost,validator.createPostValidator)
router.get('/post/by/:userId',postByUser)


router.get('/test',Test)
router.post('/signup',validator.SignUpValidator,signUp)
router.post('/signIn',signIn)
router.get('/signOut',signOut)


router.get("/users",getUsers)
router.get("/user/:userId",requireSignIn,getSingleUser)
router.put("/user/:userId",requireSignIn,updateProfile)
router.delete("/user/:userId",requireSignIn,deleteUser)
// if a request to the route is made with user id it hits this function
router.param("userId",userById)

module.exports=router