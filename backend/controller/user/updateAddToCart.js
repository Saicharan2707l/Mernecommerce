const addToCartProduct = require("../../models/cartProduct")

const updateAddToCartProduct=async(req,res)=>{
    try{
        const CurrentUserId=req.userId
        const addToCartProductId=req.body._id
        const qty=req.body.quantity
        const updateCartCount=await addToCartProduct.updateOne({_id:addToCartProductId},{
            ...(qty && {quantity:qty})
        })
        res.json({
            data:updateCartCount,
            message:"The cart value count has been updated",
            error:false,
            success:true
        })

    }
    catch(err){
        res.status(400).json({
            message:err?.message || err,
            error:true,
            success:false
        })
    }
}
module.exports=updateAddToCartProduct