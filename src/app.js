const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./modules/auth/routes");
const userRoutes = require("./modules/users/routes");
const shiftRoutes = require("./modules/shifts/routes");
const shiftAssignmentRoutes = require("./modules/shiftAssignments/routes");
const leaveRequestRoutes = require("./modules/leaveRequests/routes");

const { authMiddleware, roleMiddleware } = require("./middlewares/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/shifts", authMiddleware, shiftRoutes);
app.use("/api/shift-assignments", authMiddleware, shiftAssignmentRoutes);
app.use(
  "/api/leave-requests",
  authMiddleware,
  roleMiddleware(["nurse", "head_nurse"]),
  leaveRequestRoutes
);

module.exports = app;
