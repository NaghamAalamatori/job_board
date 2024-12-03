import mongoose from "mongoose";

// Profile Schema (Assuming `profile.contact` is part of the profile)
const profileSchema = new mongoose.Schema({
  contact: {
    type: String,
    required: false, // Set as false to allow it to be optional
    default: "Not Provided", // Default value when no contact is provided
  },
  avatar: {
    type: String,
    required: false,
    default: "https://example.com/default-avatar.png", // Default avatar URL
  },
});

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["jobseeker", "employer", "admin"],
      default: "jobseeker",
    },
    company: {
      type: String,
      default: "",
    },
    profile: profileSchema,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
