const express=require("express")
const router=express.Router();
const userSignupController=require("../controller/user/userSignUp")
const userSignInController=require('../controller/user/userSignin')
const userDetailsController=require("../controller/user/userDetails")
const authToken=require("../middleware/authToken")
const userLogout=require("../controller/user/userLogout");
const allUserDetails = require("../controller/user/allUserDetails");
const updateUser = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const categoryProduct=require("../controller/product/getCategoryWiseProduct")
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCart");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProduct = require("../controller/product/filterProduct");

router.post("/signup",userSignupController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)
//admin panel
router.get('/all-users',authToken,allUserDetails)
router.post('/updateUser',authToken,updateUser)
//products
router.post("/upload-product",authToken,uploadProductController)
router.get('/getproducts',getProductController)
router.post('/update-product',authToken,updateProductController)
router.get('/getcategoryproduct',getCategoryProduct)
router.post("/categoryProduct",categoryProduct)
router.post("/product-details",getProductDetails)
router.get('/search',searchProduct)
router.post("/filter-product",filterProduct)
//user add to cart
router.post("/addToCart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/viewProductCart",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

module.exports=router
