const express = require("express");
const authController = require("./controller");
const { authMiddleware } = require("../../middlewares/auth");

const router = express.Router();

// Route for user registration
router.post("/register", authController.register);

// Route for user login
router.post("/login", authController.login);

// Route for getting user profile (protected)
router.get("/profile", authMiddleware, authController.getProfile);

module.exports = router;
