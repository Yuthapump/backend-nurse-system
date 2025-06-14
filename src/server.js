const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.DB_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
