// backend/routes/authRoutes.js

const express = require("express");
const router = express.Router();

// Import controllers from the file we just made above!
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/authController");

// Import middleware
const { protect } = require("../middleware/authMiddleware");

// Define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/", protect, getUserProfile); // This is where /profile lives!

module.exports = router;
