const db = require("../../config/db"); // Import the database connection
const User = require("./model"); // Import the User model

// Create a new user
const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Get user by ID
const getUserById = async (userId) => {
  return await User.findById(userId);
};

// Update user by ID
const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

// Delete user by ID
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

// Get all users
const getAllUsers = async () => {
  return await User.find();
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
