async function userLogout(req,res){
    try {
        res.clearCookie("token")
        res.status(200).json({
            message:"Logout Successfully",
            success:true,
            error:false,
            data:[]
        })
    } catch (error) {
        res.status(500).json({
            error:true,
            message:error.message||error,
            success:false,
        })
    }
}
module.exports = userLogout;  