const mongoose=require('mongoose');
const Product=new mongoose.Schema(
    {
    
        title:{type:String ,requird:true},
        category:{type:String,required:true},
        desc:{type:String},
        quantity:{type:Number, required:true},
        price:{type:Number,required:true},
        img:{type:String},
        listImg:{type:Array}

    }
)
module.exports=mongoose.model("Products",Product)