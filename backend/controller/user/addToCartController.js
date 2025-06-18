const addToCartProduct = require("../../models/cartProduct")
const addToCartController=async(req,res)=>{
    try{
        const {productId}=req?.body
        const currentUser=req?.userId
        const isProductavailable= await addToCartProduct.findOne({productId})
        console.log("isProductavailable",isProductavailable)
        if(isProductavailable){
            return res.json({
                message:"Already Product exists in Add to Cart",
                error:true,
                success:false

            })
        }
        const paylod={
        productId:productId,
        quantity:1,
        userId:currentUser
        }
        const newAddToCart=new addToCartProduct(paylod)
        const saveProduct=await newAddToCart.save()
        return res.json({
            message:"Product has been Added",
            success:true,
            error:false,
            data:saveProduct
        })
    }
    catch(err){
            res.status(400).json({
            message:err?.message|| err,
            error:true,
            success:false,
        
        })
    }
}
module.exports=addToCartController