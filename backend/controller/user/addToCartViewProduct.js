const addToCartProduct = require("../../models/cartProduct")

const addToCartViewProduct=async(req,res)=>{
    try{
        const CurrentUser=req?.userId
        const allviewproduct=await addToCartProduct.find({
            userId:CurrentUser
        }).populate("productId")
        res.json({
            data:allviewproduct,
            message:"Data Has been fetched from the addToCartViewProduct",
            error:false,
            success:true
        })
    }
    catch(err){
        res.status(404).json({
            message:err.message ||err,
            error:true,
            success:false
        })
    }
}
module.exports=addToCartViewProduct