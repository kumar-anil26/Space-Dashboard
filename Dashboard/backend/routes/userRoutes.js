const express = require("express");
const router = express.Router();

// Controllers
const {
  updateProfile,
} = require("../controllers/userController");

// Middleware
const { protect } = require("../middleware/authMiddleware");


// Protected Routes

router.put("/profile", protect, updateProfile); // <- Your perfectly wired route

module.exports = router;
