const express=require('express');
const router=express.Router();
const Cart=require('../Schema/Cart');

// get  carts
router.get('/',async (req,res)=>{
    
    
    try{
        const result=await Cart.find();
        
    if(result.length!=0){
        res.status(201).json({ok:true,result,message:'All carts are retrieved successfully'});
    }else{
        
        res.status(204).json({ok:true,message:'there s no cart'});
    }
}catch(err){
    next(err) 
}
})
// get a user cart
router.get('/:userID',async (req,res)=>{
    const {userID}=req.params;
    
    try{
            const result=await Cart.find({userID});
            if(result.length!=0){
                res.status(201).json({ok:true,result,message:'The cart are retrieved successfully'});
            }else{
                throw { ok:false,status: 400, message: 'There s no cart ' }
            }
       
}catch(err){
    next(err) 
}
})

//adding product into cart

router.get('/:userID/:productID',async(req,res,next)=>{
    try{
        const {productID,userID}=req.params;
        var quantity=Number(req.query.quantity)|| 1;
    
        const user=await Cart.findOne({userID})
        if(!user){
                const item=await Cart.create({
                    userID,
                    products:{
                        productID,
                        quantity
                    }
                })
                
        }else{
            const result=await Cart.findOne({userID,'products.productID': productID})
            console.log(result)
            if(!result){
                user.products.push({productID,quantity})
                await user.save();
            }else{
                result.products.forEach(val=>{
                    if(val.productID==productID){
                        val.quantity+=quantity;
                    }
                    
                })
                await user.save()
            }
            res.status(201).json({ok:true,message:'product has been added'})
        }
    
        
    }catch(err){
        next(err) 
        
    }
})
//deleting product from cart
router.patch('/:userID/:productID',async (req,res,next)=>{
    const {userID,productID}=req.params;
    let result
    try{
        result= await Cart.deleteOne({userID, $where: 'this.products.length == 1' , 'products.productID': productID} )
        result=await Cart.findOne({userID, $where: 'this.products.length > 1'})
        for(let i=0 && result; i< result.products.length;i++){
            if(result.products[i].productID==productID){
                result.products.splice(i,1)
            }
        }

        await result.save()
       
        res.status(201).json({ok:true,message:'the item is deleted',result})
    }catch(err){
        next(err) 
    }
    
})


module.exports=router;