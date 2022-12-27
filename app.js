const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const router_product=require('./Requests/products');
const router_user=require('./Requests/users')
const router_cart=require('./Requests/cartItems')
const router_order=require('./Requests/orders')
const dotenv=require('dotenv')
const PORT=process.env.PORT || 3000;
dotenv.config()
const MANGO_URI=process.env.MANGO_URI;
const {errorResponse,invalidPathHandler}=require('./middleware/errorHandler')
app.use(express.json());

app.use(express.static(path.join(__dirname, './views')));
//app.use(express.urlencoded({ extended: true }));

app.set('views','./views')
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('index',{title:'Ecommerce API'})
})
mongoose.connect(MANGO_URI,{
    useNewUrlParser:true,useUnifiedTopology:true 
},(err)=>{
    if(err){
        console.log(err)
    }
    
})



//all API routes
app.use('/products',router_product)
app.use('/users',router_user)
app.use('/cart',router_cart)
app.use('/orders',router_order)
//app.use(errorHandler)
app.use(errorResponse)
app.use(invalidPathHandler)
app.listen(PORT)
