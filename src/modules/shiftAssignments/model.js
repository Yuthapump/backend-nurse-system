const db = require('../../config/db');

const ShiftAssignment = {
    create: async (assignmentData) => {
        const [result] = await db.query('INSERT INTO shift_assignments SET ?', assignmentData);
        return result.insertId;
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM shift_assignments WHERE id = ?', [id]);
        return rows[0];
    },

    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM shift_assignments');
        return rows;
    },

    update: async (id, assignmentData) => {
        await db.query('UPDATE shift_assignments SET ? WHERE id = ?', [assignmentData, id]);
    },

    delete: async (id) => {
        await db.query('DELETE FROM shift_assignments WHERE id = ?', [id]);
    }
};

module.exports = ShiftAssignment;