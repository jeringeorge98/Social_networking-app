const express= require('express');
const expressValidator =require('express-validator')

const validator =require('../validator/index')
const {signUp}=require('../controllers/signup')
const router = express.Router();
//router.use(expressValidator())
router.post('/signup',signUp)
module.exports=router