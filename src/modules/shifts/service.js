// service.js
const db = require("../../config/db");

const ShiftService = {
  createShift: async (shiftData) => {
    const [result] = await db.query("INSERT INTO shifts SET ?", shiftData);
    return result.insertId;
  },

  getAllShifts: async () => {
    const [shifts] = await db.query("SELECT * FROM shifts");
    return shifts;
  },

  getShiftById: async (id) => {
    const [shift] = await db.query("SELECT * FROM shifts WHERE id = ?", [id]);
    return shift[0];
  },

  updateShift: async (id, shiftData) => {
    await db.query("UPDATE shifts SET ? WHERE id = ?", [shiftData, id]);
    return id;
  },

  deleteShift: async (id) => {
    await db.query("DELETE FROM shifts WHERE id = ?", [id]);
    return id;
  },
};

module.exports = ShiftService;
