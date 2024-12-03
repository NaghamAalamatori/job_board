import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  console.log("Login request body:", req.body);

  const user = await User.findOne({
    $or: [
      { email: new RegExp(`^${usernameOrEmail}$`, "i") }, // Case-insensitive email match
      { name: usernameOrEmail },
    ],
  });

  console.log("User found:", user);

  if (!user) {
    console.log("User not found");
    return res.status(401).json({ message: "Invalid email or username" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    console.log("Incorrect password");
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log("Register request body:", req.body);

  try {
    console.log("Received user data:", req.body);

    const { name, email, password, role, profile } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      console.log("Missing required fields");
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists with email:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    try {
      // Hash the password
      console.log("Hashing password...");
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user object
      console.log("Creating user object...");
      const userData = {
        name,
        email,
        password: hashedPassword,
        role: role || "jobSeeker",
        profile: profile || {},
      };
      console.log("User data to be saved:", userData);

      // Create the user
      const user = await User.create(userData);
      console.log("User created successfully:", user._id);

      // Generate token and send response
      const token = generateToken(user._id, user.role);
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({
        message: "Database error during user creation",
        error: dbError.message,
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
});

export { authUser, registerUser };
