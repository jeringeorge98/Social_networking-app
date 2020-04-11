const express= require('express');
const expressValidator =require('express-validator')

const validator =require('../validator/index')
const {getPosts,createPost,Test}=require('../controllers')
const {signUp,signIn,signOut,requireSignIn}=require('../controllers/signup')
const router = express.Router();
router.use(expressValidator())
router.get('/',requireSignIn,getPosts)
router.get('/test',Test)
router.post('/signup',validator.SignUpValidator,signUp)
router.post('/signIn',signIn)
router.get('/signOut',signOut)
router.post('/post',validator.createPostValidator,createPost)
module.exports=router