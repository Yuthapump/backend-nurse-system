// controller.js
const LeaveRequestService = require("./service");

exports.createLeaveRequest = async (req, res) => {
  try {
    const leaveRequestData = req.body;
    const newLeaveRequest = await LeaveRequestService.createLeaveRequest(
      leaveRequestData
    );
    res.status(201).json(newLeaveRequest);
  } catch (error) {
    console.error("Create LeaveRequest Error:", error);
    res.status(500).json({ message: "Error creating leave request", error });
  }
};

exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequestService.getAllLeaveRequests();
    res.status(200).json(leaveRequests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all leave requests", error });
  }
};

exports.getLeaveRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const leaveRequest = await LeaveRequestService.getLeaveRequestById(id);
    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    res.status(200).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leave request", error });
  }
};

exports.updateLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const leaveRequestData = req.body;
    const updatedLeaveRequest = await LeaveRequestService.updateLeaveRequest(
      id,
      leaveRequestData
    );
    if (!updatedLeaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    res.status(200).json(updatedLeaveRequest);
  } catch (error) {
    res.status(500).json({ message: "Error updating leave request", error });
  }
};

exports.deleteLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await LeaveRequestService.deleteLeaveRequest(id);
    if (!result) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting leave request", error });
  }
};

exports.approveLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approved_by } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const existing = await LeaveRequestService.getLeaveRequestById(id);
    if (!existing) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    const updated = await LeaveRequestService.updateLeaveRequest(id, {
      status,
      approved_by,
    });

    res.status(200).json({ message: "Leave request updated", id: updated });
  } catch (error) {
    res.status(500).json({ message: "Error approving leave request", error });
  }
};
