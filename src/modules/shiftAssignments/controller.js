// controller.js
const ShiftAssignmentService = require("./service");

exports.createShiftAssignment = async (req, res) => {
  try {
    const shiftAssignment = await ShiftAssignmentService.createShiftAssignment(
      req.body
    );
    res.status(201).json(shiftAssignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllShiftAssignments = async (req, res) => {
  try {
    const shiftAssignments =
      await ShiftAssignmentService.getAllShiftAssignments();
    res.status(200).json(shiftAssignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getShiftAssignmentById = async (req, res) => {
  try {
    const shiftAssignment = await ShiftAssignmentService.getShiftAssignmentById(
      req.params.id
    );
    if (!shiftAssignment) {
      return res.status(404).json({ message: "Shift assignment not found" });
    }
    res.status(200).json(shiftAssignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMySchedule = async (req, res) => {
  const nurseId = req.user.userId;
  if (!nurseId) {
    return res.status(400).json({ message: "Nurse ID is required" });
  }

  try {
    const schedule = await ShiftAssignmentService.getScheduleByNurseId(nurseId);
    res.status(200).json(schedule);
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ message: "Error retrieving schedule", error });
  }
};

exports.updateShiftAssignment = async (req, res) => {
  try {
    const updatedShiftAssignment =
      await ShiftAssignmentService.updateShiftAssignment(
        req.params.id,
        req.body
      );
    if (!updatedShiftAssignment) {
      return res.status(404).json({ message: "Shift assignment not found" });
    }
    res.status(200).json(updatedShiftAssignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteShiftAssignment = async (req, res) => {
  try {
    const result = await ShiftAssignmentService.deleteShiftAssignment(
      req.params.id
    );
    if (!result) {
      return res.status(404).json({ message: "Shift assignment not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
