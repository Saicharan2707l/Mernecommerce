const productModel = require("../../models/productModel")

const getProductDetails=async(req,res)=>{
    try{
       const {productId}=req.body
       const productbyid=await productModel.findById(productId)
       console.log("the product details has been fetched successfully by id", productbyid)
       res.status(200).json({
        data:productbyid,
        error:false,
        success:true,
        message:"product has been successfully fetched by id"
       })
       
    }catch(err){
 
        res.status(400).json({
            message:err?.message || err,
            success:false,
            error:true
        })

    }
}
module.exports=getProductDetails