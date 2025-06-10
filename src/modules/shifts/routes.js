// routes.js
const express = require("express");
const router = express.Router();
const shiftsController = require("./controller");
const { roleMiddleware } = require("../../middlewares/auth");

// Define routes for shifts
router.get("/", roleMiddleware(["head_nurse"]), shiftsController.getAllShifts);
router.post("/", roleMiddleware(["head_nurse"]), shiftsController.createShift);
router.get(
  "/:id",
  roleMiddleware(["head_nurse"]),
  shiftsController.getShiftById
);
router.put(
  "/:id",
  roleMiddleware(["head_nurse"]),
  shiftsController.updateShift
);
router.delete(
  "/:id",
  roleMiddleware(["head_nurse"]),
  shiftsController.deleteShift
);

module.exports = router;
