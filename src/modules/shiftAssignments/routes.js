const express = require("express");
const router = express.Router();
const shiftAssignmentController = require("./controller");
const { authMiddleware, roleMiddleware } = require("../../middlewares/auth");

router.get(
  "/my-schedule",
  roleMiddleware(["nurse"]),
  shiftAssignmentController.getMySchedule
);

// Define routes for shift assignments
router.post(
  "/",
  roleMiddleware(["head_nurse"]),
  shiftAssignmentController.createShiftAssignment
);
router.get(
  "/",
  roleMiddleware(["head_nurse"]),
  shiftAssignmentController.getAllShiftAssignments
);
router.get(
  "/:id",
  roleMiddleware(["head_nurse"]),
  shiftAssignmentController.getShiftAssignmentById
);
router.put(
  "/:id",
  roleMiddleware(["head_nurse"]),
  shiftAssignmentController.updateShiftAssignment
);
router.delete(
  "/:id",
  roleMiddleware(["head_nurse"]),
  shiftAssignmentController.deleteShiftAssignment
);

module.exports = router;
