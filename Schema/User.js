const mongoose=require('mongoose');
const User=new mongoose.Schema(
    {
    
        email:{type:String, required: true, unique:true,index:true},
        password:{type:String, required: true},
        tel:{type:String},
        firstname:{type:String,required:true},
        lastname:{type:String,required:true},
        isUser:{type:Boolean,default:true}

    }
)
module.exports=mongoose.model("User",User)