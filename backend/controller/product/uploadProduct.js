const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel")
const userModel = require("../../models/userModel")

async function uploadProductController(req,res){
    try{

        const sessionUserId = req.userId;
        const permission = await uploadProductPermission(sessionUserId);
        if (!permission) {
            throw new Error("Permission denied error")
        }
        const user = await userModel.findById(sessionUserId)
        const uploadProduct=new productModel(req.body)
        const saveproduct=await uploadProduct.save()

        res.status(201).json({
            message:"Product Created Successfully",
            error:false,
            success:true,
            data:saveproduct
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
module.exports=uploadProductController;