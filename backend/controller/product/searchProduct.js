const productModel = require("../../models/productModel")

const searchProduct=async(req,res)=>{
    try{
        const query=req.query.q
        const regex=new RegExp(query,"i","g")

        const product=await productModel.find({
            "$or":[
                {
                    category:regex
                },
                {
                    productName:regex
                }
            ]
        })
        res.json({
            data:product,
            message:"Search Product has been fetched",
            error:false,
            success:true
        })
    }
    catch(error){
        res.statue(400).error({
            message:error.message || error,
            success:false,
            error:true
        })
    }
}
module.exports=searchProduct