const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel")
async function updateProductController(req,res){
    try{
        
        const permission = await uploadProductPermission(req.userId);
        if (!permission) {
            throw new Error("Permission denied error")
        }

        const {_id,...resBody}=req.body
        const updatedProduct=await productModel.findByIdAndUpdate(_id,resBody)

        res.status(200).json({
            message:"Updated Product Successfully",
            data:updatedProduct,
            error:false,
            success:true
        })
    } 
    catch(err){
        res.status(400).json({
            message:err.message|| err,
            error:true,
            success:false,
        })
    }
}
module.exports=updateProductController