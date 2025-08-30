const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
    minlength: [2, "Minimum name 2 characters required"],
    maxlength: [20, "Maximum name 20 characters allowed"],
  },
  UserName: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    minlength: [6, "minimum password required 6"],
    required: [true, "Password is required"],
  },
  isDarkMode: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    default: "Male",
  },
  dateOfBirth: {
    type: Date,
    default: function () {
      const now = new Date();
      now.setFullYear(now.getFullYear() - 18);
      return now;
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBand: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    value: { type: Boolean, default: false },
    verifyAT: Date,
  },
  Otp: {
    value: String,
    CreateAT: Date,
  },
  CreateAt: {
    type: Date,
    default: Date.now,
  },
});

const Users_collection = mongoose.model("User", userSchema);

module.exports = {
  Users_collection,
};
