import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

// Controller to fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error: Unable to fetch users" });
  }
};

// Controller to delete a user by ID
// Controller to delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    // Use findByIdAndDelete instead of remove
    const user = await User.findByIdAndDelete(req.params.id);

    // If user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ message: "Server error: Unable to delete user" });
  }
};

// Controller to fetch platform analytics
export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      totalUsers,
      totalJobs,
      totalApplications,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error: Unable to fetch analytics" });
  }
};
