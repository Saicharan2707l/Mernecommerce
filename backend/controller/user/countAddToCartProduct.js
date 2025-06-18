const addToCartProduct = require("../../models/cartProduct")

const countAddToCartProduct=async(req,res)=>{
    try{
        const userId=req.userId
        const count=await addToCartProduct.countDocuments({
            userId:userId
        })
        res.json({
            data:{
                count:count
            },
            error:false,
            success:true,
            message:"OK"
        })

    }
    catch(error){
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
    
}
module.exports=countAddToCartProduct