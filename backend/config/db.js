const mongoose=require("mongoose")
async function ConnectDB() {
    try{
        await mongoose.connect(process.env.MONGOGB_URI)
        console.log("Connected mongodb")
    }
    catch(err){
        console.log("error message",err)
    }
}
module.exports=ConnectDB;