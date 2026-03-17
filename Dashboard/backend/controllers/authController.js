// backend/controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 1. Helper function
const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = null,
  error = null
) => {
  return res.status(statusCode).json({ success, message, data, error });
};

// 2. Token generators
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// backend/controllers/authController.js

const sendTokenResponse = (user, statusCode, message, res) => {
  const token = generateToken(user._id);
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // ⚠️ CHANGE THIS LINE: Change "strict" to "lax"
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", 
  };


  const userData = {
    id: user._id,
    email: user.email,
    name: user.name,
    title: user.title,
    bio: user.bio,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: message,
    data: userData,
    error: null,
  });
};

// 3. Controllers
exports.registerUser = async (req, res) => {
  try {
    const { email, password, name, title, bio, socialLinks, githubStats } =
      req.body;
    if (!email || !password || !name) {
      return sendResponse(
        res,
        400,
        false,
        "Please provide email, password, and name."
      );
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendResponse(
        res,
        400,
        false,
        "User already exists with this email."
      );
    }
    const user = await User.create({
      email,
      password,
      name,
      title,
      bio,
      socialLinks,
      githubStats,
    });
    sendTokenResponse(
      user,
      201,
      "User registered and logged in successfully.",
      res
    );
  } catch (error) {
    if (error.name === "ValidationError")
      return sendResponse(
        res,
        400,
        false,
        "Validation Error",
        null,
        error.message
      );
    return sendResponse(
      res,
      500,
      false,
      "Server error during registration.",
      null,
      error.message
    );
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return sendResponse(
        res,
        400,
        false,
        "Please provide email and password."
      );
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      sendTokenResponse(user, 200, "Login successful.", res);
    } else {
      return sendResponse(res, 401, false, "Invalid email or password.");
    }
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Server error during login.",
      null,
      error.message
    );
  }
};

exports.logoutUser = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  return sendResponse(res, 200, true, "Logged out successfully.");
};

exports.getUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id)
      return sendResponse(res, 401, false, "Not authorized.");
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return sendResponse(res, 404, false, "User not found.");
    return sendResponse(res, 200, true, "User data retrieved.", user);
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Server error retrieving user data.",
      null,
      error.message
    );
  }
};
