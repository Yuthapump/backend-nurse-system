const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

// Function to create a JWT token
const createToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null; // Return null if token is invalid
  }
};

module.exports = {
  createToken,
  verifyToken,
};
