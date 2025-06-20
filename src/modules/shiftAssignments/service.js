// service.js
const db = require("../../config/db");
const ShiftAssignment = require("./model");

// Create a new shift assignment
const createShiftAssignment = async (data) => {
  try {
    const newAssignment = await ShiftAssignment.create(data);
    return newAssignment;
  } catch (error) {
    throw new Error("Error creating shift assignment: " + error.message);
  }
};

// Get all shift assignments
const getAllShiftAssignments = async () => {
  try {
    const assignments = await ShiftAssignment.findAll();
    return assignments;
  } catch (error) {
    throw new Error("Error fetching shift assignments: " + error.message);
  }
};

// Get a shift assignment by ID
const getShiftAssignmentById = async (id) => {
  try {
    const assignment = await ShiftAssignment.findById(id);
    if (!assignment) {
      throw new Error("Shift assignment not found");
    }
    return assignment;
  } catch (error) {
    throw new Error("Error fetching shift assignment: " + error.message);
  }
};

const getScheduleByNurseId = async (nurseId) => {
  try {
    return await ShiftAssignment.getScheduleByNurseId(nurseId);
  } catch (error) {
    throw new Error("Error fetching schedule: " + error.message);
  }
};

// Update a shift assignment
const updateShiftAssignment = async (id, data) => {
  try {
    const assignment = await ShiftAssignment.findById(id);
    if (!assignment) {
      throw new Error("Shift assignment not found");
    }
    await assignment.update(data);
    return assignment;
  } catch (error) {
    throw new Error("Error updating shift assignment: " + error.message);
  }
};

// Delete a shift assignment
const deleteShiftAssignment = async (id) => {
  try {
    const assignment = await ShiftAssignment.findById(id);
    if (!assignment) {
      throw new Error("Shift assignment not found");
    }
    await assignment.destroy();
    return { message: "Shift assignment deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting shift assignment: " + error.message);
  }
};

module.exports = {
  createShiftAssignment,
  getAllShiftAssignments,
  getShiftAssignmentById,
  updateShiftAssignment,
  deleteShiftAssignment,
  getScheduleByNurseId,
};
