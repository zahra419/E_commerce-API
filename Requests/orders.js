const express=require('express');
const { find } = require('../Schema/Order');
const router=express.Router();
const Order=require('../Schema/Order');

// get all  orders 
router.get('/',async (req,res,next)=>{
    try{
        const {createdAt}=req.query;
        const result=await Order.find().sort(createdAt);
    
    if(result.length!=0){
        res.status(201).json({ok:true, result,message:'All orders are retrieved successfully'});
    }else{
        res.status(204).json({ok:true,message: "there s no order"})
    }
}catch(err){
    next(err) 
}
})

// get all detail of order of user
router.get('/:userID',async (req,res,next)=>{
    const _id=req.params.userID;
    console.log(_id)
    try{
        const details=await Order.find({_id});

    if(details.length!=0){
        res.status(201).json({ok:true, details});
    }else{
        res.status(204).json({ok:true,message: "there s no products ordered"})
    }
}catch(err){
    next(err) 
}
})

//add new order

router.post('/newOrder/:userID',async(req,res,next)=>{
    try{
        const userID=req.params;
        const {address,total,products}=req.body;
        const createdAt=Date.now()
    
            if(userID && address && products &&total){
                const result=await Order.create({
                    userID,
                    products,
                    address,
                    total,
                    createdAt
                })
                
                res.status(201).json({ok:true,result,message:'the order is created successfully'})
        
            }else{
                 throw {ok:false, status: 400, message: 'all inputs are required' }
            }
    }catch(err){
        next(err) 
        
    }
})
// updating state of order
router.patch('/:id',async (req,res,next)=>{
    const _id=req.params.id;
    const {state}=req.body;
    try{
        const result=await Order.findOne({_id})
        if(result && state){
            result.state=state;
            await result.save()
            res.status(201).json({ok:true,result,message:'state of order is updated'})
        }
        
    }catch(err){
        next(err) 
    }
    
})
// updating order by user
router.put('/:orderID',async (req,res,next)=>{
    const _id=req.params.orderID
    const content=req.body
    
    try{
        if(content){
            const result=await Order.findByIdAndUpdate({_id}, content)
            res.status(201).json({ok:true,msg:'order is updated',result})
           }else{
            throw { ok:false,status: 400, message: 'Data required' }
           }
    }catch(err){
        next(err) 
    }
    
})


module.exports=router;