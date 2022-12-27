const mongoose=require('mongoose');
const Cart=new mongoose.Schema(
    {
        userID:{type:mongoose.Schema.Types.ObjectId, ref: 'User',required:true,index:true},
        products:[{
            productID:{type: mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true},
            quantity:{type:Number,default:1,min:1}
        }]

    }
)
module.exports=mongoose.model("Cart",Cart) 
