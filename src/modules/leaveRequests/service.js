const LeaveRequest = require("./model");
const ShiftAssignment = require("../shiftAssignments/model");

const createLeaveRequest = async (leaveRequestData) => {
  const assignment = await ShiftAssignment.findById(
    leaveRequestData.shift_assignment_id
  );
  if (!assignment) {
    throw new Error("Shift assignment not found");
  }
  if (assignment.user_id !== leaveRequestData.userId) {
    throw new Error("You can only request leave for your own shift assignment");
  }
  return await LeaveRequest.create(leaveRequestData);
};

const getAllLeaveRequests = async () => {
  return await LeaveRequest.findAll();
};

const getLeaveRequestById = async (id) => {
  return await LeaveRequest.findById(id);
};

const updateLeaveRequest = async (id, updateData) => {
  return await LeaveRequest.update(id, updateData);
};

const deleteLeaveRequest = async (id) => {
  return await LeaveRequest.delete(id);
};

module.exports = {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequest,
  deleteLeaveRequest,
};
