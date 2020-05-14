const express= require('express');
const expressValidator =require('express-validator')

const validator =require('../validator/index')
const {getPosts,createPost,Test,postByUser,postById,checkPoster,deletePost,updatePost}=require('../controllers')
const {hasAuthorization,userById,getUsers,getSingleUser,updateProfile,deleteUser,getUserphoto,addFollowers,addFollowing,removeFollowers,removeFollowing,suggestFollowers}=require('../controllers/User')
const {signUp,signIn,signOut,requireSignIn,}=require('../controllers/signup')
const router = express.Router();
router.use(expressValidator())

// for posts
router.get('/posts',getPosts)
router.post('/post/new/:userId',requireSignIn,createPost,validator.createPostValidator)
router.get('/post/by/:userId',requireSignIn,postByUser)
router.put('/post/update/:postId',requireSignIn,checkPoster,updatePost)
router.delete('/post/:postId',requireSignIn,checkPoster,deletePost);


router.post('/signup',validator.SignUpValidator,signUp)
router.post('/signIn',signIn)
router.get('/signOut',signOut)


router.get("/users",getUsers)
router.get("/user/:userId",requireSignIn,getSingleUser)
router.put("/user/update/:userId",requireSignIn,updateProfile)
router.delete("/user/delete/:userId",requireSignIn,deleteUser)
router.get("/user/photo/:userId",getUserphoto)

// following
router.put("/user/follow",requireSignIn,addFollowing,addFollowers)
//unfolllowing
router.put("/user/unfollow",requireSignIn,removeFollowing,removeFollowers)
// to suggest users

router.get("/user/suggestUser/:userId",requireSignIn,suggestFollowers)
// if a request to the route is made with user id it hits this function first
router.param("userId",userById)

// if a request to the route is made with post id it hits this function
router.param("postId",postById)

module.exports=router