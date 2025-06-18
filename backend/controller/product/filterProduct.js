const productModel = require("../../models/productModel");

const filterProduct=async(req,res)=>{
    try{
        const categoryList=req?.body?.category || [];
        const product=await productModel.find({
            category:{
                "$in":categoryList
            }
        })
        res.json({
            data:product,
            message:"Category List has been filtered",
            success:true,
            error:false
        })
    }
    catch(error){
        res.json({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}
module.exports=filterProduct