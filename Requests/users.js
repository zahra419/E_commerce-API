const express=require('express');
const { findOne } = require('../Schema/Product');
const router=express.Router();
const User=require('../Schema/User');
const dotenv=require('dotenv')
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken')
dotenv.config()
const auth=require('./auth');
router.use('/useer',auth);

router.post('/login',async (req,res,next)=>{
  
    try{
      const {email,password}=req.body
     if(email && password){
        const user=await User.findOne({email})  
        if(user && await bcrypt.compare(password,user.password)){
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN,
            {
              expiresIn: "2h",
            }
          );
          
          user.token = token;
          let result={
            _id:user._id,
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            tel: user.tel,
            isUser:user.isUser
          }
          res.status(201).json({ok:true, message:'user is logged in',result});;
        }
        throw {ok:false, status: 400, message: 'Invalid Credentials' }
      }else{
        throw {ok:false, status: 400, message: 'All inputs are required' }
      }
      
    }catch(err){
      next(err)  
    }
     

    
})

router.post('/register',async (req,res,next)=>{
    
    
    try{
        
      const {email,password,lastname,firstname,isUser,tel}=req.body
      if(!email || !password || !lastname || !firstname || !tel){
        throw {ok:false, status: 404, message: 'All inputs are required' }
      }
      const db_email=await User.findOne({email})
      
      if(db_email){
        return res.status(409).json({ok:true,message:'user already exits'})
      }else{
        encryptedPassword = await bcrypt.hash(password, 10);
        
        const user=await User.create({
            email,
            password: encryptedPassword,
            lastname,
            firstname,
            isUser,
            tel
        })
    
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN,
            {
              expiresIn: "2h",
            }
          );
          
          user.token = token;
          
          res.status(201).json({ok:true,message:'the user is registered'});
      }
    
    }catch(err){
       next(err) 

    }
    
})
module.exports=router;
