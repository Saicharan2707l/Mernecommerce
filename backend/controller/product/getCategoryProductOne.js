const productModel = require("../../models/productModel")

const getCategoryProduct = async(req, res) => {
    try {
        const productCategory = await productModel.distinct("category")
        
        const categoriesarray = []
        
        for(const category of productCategory) {
            // Correct syntax for MongoDB findOne
            const product = await productModel.findOne({category: category})
            
            if(product) {
                categoriesarray.push(product)
            }
        }
        
        // Make sure we're using productByCategory, not some other variable
        res.status(200).json({
            data: categoriesarray, 
            error: false,
            success: true,
            message: "Categories fetched successfull"
        })
    }
    catch(err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = getCategoryProduct