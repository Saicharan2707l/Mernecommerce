const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    productName:String,
    brandName:String,
    category:String,
    description:String,
    productImage:[],
    price:Number,
    selling:Number
},{
    timestamps:true,
})
const productModel=mongoose.model("product",productSchema)
module.exports = productModel;

