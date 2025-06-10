const express = require("express");
const router = express.Router();
const leaveRequestController = require("./controller");

// Route to create a leave request
router.post("/", leaveRequestController.createLeaveRequest);

// Route to get all leave requests
router.get("/", leaveRequestController.getAllLeaveRequests);

// Route to get a specific leave request by ID
router.get("/:id", leaveRequestController.getLeaveRequestById);

// Route to update a leave request by ID
router.put("/:id", leaveRequestController.updateLeaveRequest);

// Route to delete a leave request by ID
router.delete("/:id", leaveRequestController.deleteLeaveRequest);

// Route to approve leave request
router.patch("/:id/approve", leaveRequestController.approveLeaveRequest);

module.exports = router;
