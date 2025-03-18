const express=require("express")
const router=express.Router();
const userSignupController=require("../controller/userSignUp")
const userSignInController=require('../controller/userSignin')
const userDetailsController=require("../controller/userDetails")
const authToken=require("../middleware/authToken")
const userLogout=require("../controller/userLogout");
const allUserDetails = require("../controller/allUserDetails");
const updateUser = require("../controller/updateUser");
router.post("/signup",userSignupController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)
//admin panel
router.get('/all-users',authToken,allUserDetails)
router.post('/updateUser',authToken,updateUser)
module.exports=router
