const userModel = require("../models/userModel")
async function allUserDetails(req,res) {
    try{
        console.log("All User Details Controller",req.userId)
        const allUserData=await userModel.find()
        res.json({
            message:"ALl USer Details",
            error:false,
            success:true,
            data:allUserData
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
module.exports=allUserDetails