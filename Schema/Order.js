const mongoose=require('mongoose');
const Order=new mongoose.Schema(
    {
    
        userID:{type:String,required:true,index:true},
        products:[{
            productID:{type:String,required:true},
            quantity:{type:Number,default:1,min:1}
        }],
        address:{type:String, required:true},
        total:{type:Number},
        state:{type:String, default:'pending'},
        updatedAt:{type:Date, default:()=>Date.now(), immutable: true},
        createdAt:{type:Date, immutable: true}
    }
)
module.exports=mongoose.model("Order",Order)