const db = require('../../config/db');

const User = {
    create: async (userData) => {
        const [result] = await db.query('INSERT INTO users SET ?', userData);
        return result.insertId;
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    },

    update: async (id, userData) => {
        await db.query('UPDATE users SET ? WHERE id = ?', [userData, id]);
        return id;
    },

    delete: async (id) => {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        return id;
    }
};

module.exports = User;