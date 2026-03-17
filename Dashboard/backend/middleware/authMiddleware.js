const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1. ADDED: Standardized response helper (keeps API consistent)
const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = null,
  error = null
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    error,
  });
};

exports.protect = async (req, res, next) => {
  // Optional chaining (?.) prevents a crash if req.cookies is entirely undefined
  let token = req.cookies?.token;

  if (!token) {
    return sendResponse(res, 401, false, "Not authorized, no token provided.");
  }

  try {
    // 1. Verify the token signature and expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Fetch the user from the database
    req.user = await User.findById(decoded.id).select("-password");

    // 3. CRITICAL FIX: Ensure the user still exists in the database!
    if (!req.user) {
      return sendResponse(
        res,
        401,
        false,
        "Not authorized, user account no longer exists."
      );
    }

    // 4. Proceed to the next middleware or controller
    next();
  } catch (error) {
    // This catches expired tokens or invalid signatures
    return sendResponse(
      res,
      401,
      false,
      "Not authorized, token failed or expired.",
      null,
      error.message
    );
  }
};
