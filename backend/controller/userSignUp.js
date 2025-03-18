const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

async function userSignupController(req, res) {
  try {
    // Destructure email, password, and name from req.body
    const { email, password, name,profilePic } = req.body;
    const users=await userModel.findOne({email})
    if(users){
        throw new Error("Email is already exists");
    }
    console.log("req body",req.body)
    // Check for required fields
    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    if (!name) {
      throw new Error("Name is required");
    }
    // Generate a salt and hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashpassword =await  bcrypt.hashSync(password, salt);
    if (!hashpassword) {
      throw new Error("Password is invalid");
    }
  // Create payload using the hashed password
  const payload = {
    email,
    name,
    role: "GENERAL",
    password: hashpassword,
    profilePic,
  };
    // Create a new user model instance
    const userData = new userModel(payload);
    // Save the user and await the result
    await userData.save();
    // Respond with success message
    res.status(200).json({
      data: userData,
      success: true,
      error: false,
      message: "User Created Successfully",
    });
  } catch (err) {
    console.error("Signup error:", err);
    // Respond with error details
    res.status(500).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}
module.exports = userSignupController;
