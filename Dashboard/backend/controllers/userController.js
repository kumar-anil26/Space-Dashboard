const User = require("../models/User"); // Adjust path as needed

// Helper function to format standard responses
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

/**
//  * @desc    Get current user profile
//  * @route   GET /api/users/profile
//  * @access  Private (Requires Authentication Middleware)
//  */

/**
 // * @desc    Update user profile
 // * @route   PUT /api/users/profile
 // * @access  Private
 **/
exports.updateProfile = async (req, res) => {
  try {
    // 1. Fetch the user
    const user = await User.findById(req.user.id);
    if (!user) {
      return sendResponse(res, 404, false, "User not found.");
    }

    // 2. Prevent password updates through this route (best practice is a separate route for passwords)
    if (req.body.password) {
      return sendResponse(
        res,
        400,
        false,
        "Please use the dedicated password reset route to change passwords."
      );
    }

    // 3. Handle Email Updates (Requires checking if the new email is already taken)
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return sendResponse(
          res,
          400,
          false,
          "Email is already in use by another account."
        );
      }
      user.email = req.body.email;
    }

    // 4. Update standard fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.title) user.title = req.body.title;
    if (req.body.bio) user.bio = req.body.bio;

    // 5. Update nested objects safely (merging existing with new)
    if (req.body.socialLinks) {
      user.socialLinks = {
        ...user.socialLinks.toObject(),
        ...req.body.socialLinks,
      };
    }
    if (req.body.githubStats) {
      user.githubStats = {
        ...user.githubStats.toObject(),
        ...req.body.githubStats,
      };
    }

    // 6. Save the user (Triggers Mongoose validation)
    await user.save();

    // 7. Format response
    const updatedUser = user.toObject();
    delete updatedUser.password;

    return sendResponse(
      res,
      200,
      true,
      "Profile updated successfully.",
      updatedUser
    );
  } catch (error) {
    // Handle duplicate key error (MongoDB Error Code 11000) just in case
    if (error.code === 11000) {
      return sendResponse(
        res,
        400,
        false,
        "Duplicate field value entered.",
        null,
        error.message
      );
    }
    return sendResponse(
      res,
      500,
      false,
      "Server error while updating profile.",
      null,
      error.message
    );
  }
};

/**
 * @desc    Delete user account
 * @route   DELETE /api/users/profile
 * @access  Private
 */
exports.deleteUser = async (req, res) => {
  try {
    // 1. Find user by ID and delete
    const user = await User.findByIdAndDelete(req.user.id);

    // 2. Check if user existed
    if (!user) {
      return sendResponse(res, 404, false, "User not found. Could not delete.");
    }

    return sendResponse(res, 200, true, "User account deleted successfully.");
  } catch (error) {
    return sendResponse(
      res,
      500,
      false,
      "Server error while deleting account.",
      null,
      error.message
    );
  }
};
