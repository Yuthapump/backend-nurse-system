const db = require("../../config/db");

const LeaveRequest = {
  async create(data) {
    const [result] = await db.query(
      "INSERT INTO leave_requests (shift_assignment_id, reason, status) VALUES (?, ?, ?)",
      [data.shift_assignment_id, data.reason, data.status || "pending"]
    );
    return result.insertId;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM leave_requests WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  async findByAssignmentId(shift_assignment_id) {
    const [rows] = await db.query(
      "SELECT * FROM leave_requests WHERE shift_assignment_id = ?",
      [shift_assignment_id]
    );
    return rows[0];
  },

  async findAll() {
    const [rows] = await db.query("SELECT * FROM leave_requests");
    return rows;
  },

  async update(id, data) {
    await db.query("UPDATE leave_requests SET ? WHERE id = ?", [data, id]);
    return id;
  },

  async delete(id) {
    await db.query("DELETE FROM leave_requests WHERE id = ?", [id]);
    return id;
  },
};

module.exports = LeaveRequest;
