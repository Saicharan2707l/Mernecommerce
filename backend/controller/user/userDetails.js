const userModel = require("../../models/userModel")
async function userDetailsController(req,res) {
    try{
        const user=await userModel.findById(req.userId)
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"User Found"

        })
    }
    catch(error){
        res.status(400).json({
            message:error.message|| error,
            error:true,
            success:false,
        })
    }    
}
module.exports=userDetailsController