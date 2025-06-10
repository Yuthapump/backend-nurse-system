const LeaveRequest = require("./model");
const ShiftAssignment = require("../shiftAssignments/model");

const createLeaveRequest = async (leaveRequestData) => {
  const existing = await LeaveRequest.findByAssignmentId(
    leaveRequestData.shift_assignment_id
  );
  if (existing) {
    return {
      message: "Leave request for this shift assignment already exists",
      existing,
    };
  }
  const assignment = await ShiftAssignment.findById(
    leaveRequestData.shift_assignment_id
  );
  console.log("assignment:", assignment);
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
