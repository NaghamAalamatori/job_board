import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
  console.log("Token received:", token);

  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Find user by ID from token payload
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      console.error("User not found for token:", decoded.id);
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }

    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
});

// Middleware to authorize based on roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.error(
        "User object missing in request. Ensure 'protect' middleware is used."
      );
      return res.status(401).json({ message: "Not authorized" });
    }

    // Check if the user's role matches the allowed roles
    if (!roles.includes(req.user.role)) {
      console.warn(`Access denied for user role: ${req.user.role}`);
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }

    next();
  };
};

export { protect, authorize };
