const productModel = require("../../models/productModel")

const getCategoryProductWiseProduct=async(req,res)=>{
    try{
        const {category}=req?.body || req?.query
        const product = await productModel.find({category})
        res.status(201).json({
            data:product,
            message:"Product has been Fetched Successfully",
            error:false,
            success:true
        })
    }
    catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}
module.exports=getCategoryProductWiseProduct