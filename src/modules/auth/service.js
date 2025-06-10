// service.js
const db = require("../../config/db");
const jwt = require("../../utils/jwt");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/jwt");

const AuthService = {
  async register(username, email, password, role) {
    if (!username || !email || !password || !role) {
      throw new Error("All fields are required");
    }

    // Check if the email already exists
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0) {
      throw new Error("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role]
    );

    return { id: result.insertId, username, email, role };
  },

  async login(email, password) {
    if (!email || !password) {
      throw new Error("Missing username or password");
    }

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email.trim(),
    ]);

    const user = users[0];
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = createToken({ userId: user.id, role: user.role });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  async validateToken(token) {
    try {
      const decoded = jwt.verifyToken(token);
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  },

  async getUserById(userId) {
    const [users] = await db.query(
      "SELECT id, name, email, role FROM users WHERE id = ?",
      [userId]
    );
    if (users.length === 0) {
      throw new Error("User not found");
    }
    return users[0];
  },
};

module.exports = AuthService;
