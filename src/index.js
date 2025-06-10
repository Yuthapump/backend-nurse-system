const express = require("express");
const app = require("./app");
const db = require("./config/db");

const PORT = process.env.DB_PORT || 4000;

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
