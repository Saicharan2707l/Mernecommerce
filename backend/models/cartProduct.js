const mongoose=require('mongoose')

const addToCartProductSchema=new mongoose.Schema({
    productId:{         
        ref : 'product',
        type : String,
   
    },
    quantity:Number,
    userId:String
},{
    timestamps:true,
})
const addToCartProduct=mongoose.model("addToCartProduct",addToCartProductSchema)
module.exports = addToCartProduct;

