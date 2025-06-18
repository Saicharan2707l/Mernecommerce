const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require("dotenv").config();
async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        error: true,
        success: false,
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
        error: true,
        success: false,
      });
    }
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Entered email or password is wrong",
        error: true,
        success: false,
      });
    }
    // Compare password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Password given is incorrect",
        error: true,
        success: false,
      });
    }
    // Prepare token data
    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    // Generate JWT token (valid for 8 hours)
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 8, // 8 hours
    });
    // Set cookie options
    const tokenOption = {
      httpOnly: true, // Prevents client-side JS from reading the token
      secure: process.env.NODE_ENV === "production", // Ensures cookie is sent only over HTTPS
    };
    // Set token in cookies and send response
    res.cookie("token", token, tokenOption).status(200).json({
      data: token,
      success: true,
      error: false,
      message: "Login successful",
    });
  } catch (error) {
    // Error handler
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
module.exports = userSignInController;
