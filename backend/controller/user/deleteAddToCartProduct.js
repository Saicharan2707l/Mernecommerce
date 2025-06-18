const addToCartProduct = require("../../models/cartProduct")

const deleteAddToCartProduct=async(req,res)=>{
    try{
        const CurrentuserId=req.userId
        const addToCartProductId=req.body._id
        console.log("CurrentuserId is",CurrentuserId)
        console.log("addToCartProductId is",addToCartProductId)
        
        const deleteProduct=await addToCartProduct.findByIdAndDelete({_id:addToCartProductId})

        res.status(400).json({
            data:deleteProduct,
            message:"Item has been deleted from Cart",
            error:false,
            success:true
        })

    }
    catch(error){
        res.status(400).error({
            error:true,
            success:false,
            message:error.message || error
        })
    }
}
module.exports=deleteAddToCartProduct