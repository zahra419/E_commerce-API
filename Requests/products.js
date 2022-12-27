const express=require('express');
const { findByIdAndDelete, findByIdAndUpdate } = require('../Schema/Product');
const router=express.Router();
const Product=require('../Schema/Product');



// displaying all products or by category
router.get('/',async (req,res,next)=>{
    const category=req.query.category;
    const limit=Number(req.query.limit) || 0;
    let result;
    try{
        
    
         result=await Product.find().limit(limit);
    
    if(result.length!=0){
        res.status(201).json({ok:true,result,message:'products are loaded successfully'});;
    }else{
        res.status(204).json({ok: true,message: "there s no product"})
    }
}catch(err){
    next(err) 
}
})
// displaying one product
router.get('/:id',async (req,res,next)=>{
    const _id=req.params.id;
    try{
    const result=await Product.findById({_id});
    if(result){
        res.status(201).json({ok:true,result,message:'Product details are retrieved successfully'});
    }else{
        throw { status: 400, message: 'Product doesnt exist',ok:false }
    }
    }catch(err){
        next(err) 
    }
    
})

//adding new product

router.post('/newProduct',async(req,res,next)=>{
    try{
        const {title,desc,category,price,listImg,quantity,img}=req.body
        
        if(title && price && quantity && category){
            
            const newProduct=new Product({
                title,
                desc,
                category,
                quantity,
                price ,
                img,
                listImg
            })
            const result=await newProduct.save()
            res.status(201).json({ok:true,result, message:'product is created successfully'});
        }else{
            throw { status: 400, message: 'Data is required' ,ok:false}
        }
        
    }catch(err){
        next(err) 
        
    }
})
// deleting product
router.delete('/:id',async (req,res,next)=>{
    const _id=req.params.id;
    try{
       await Product.findByIdAndDelete({_id});
        res.status(201).json({ok:true ,message:'The product is deleted'});
    }catch(err){
        next(err) 
    }
    
})
// updating product
router.patch('/:id',async (req,res,next)=>{
    const _id=req.params.id;
    const content=req.body
    
    try{
        console.log(content)
       if(content){
        const result=await Product.findByIdAndUpdate({_id}, content)
        console.log(result)
        res.status(201).json({ok:true,result, message:'product is updated'});
       }else{
        res.status(400).json({ok:false,message:'data required for modification'})
       }
    }catch(err){
        next(err) 
    }
    
})


module.exports=router;