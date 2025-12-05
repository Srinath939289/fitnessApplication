const mysql = require("mysql2/promise");
require("dotenv").config();

console.log("Database Config - Host:", process.env.DB_HOST);
console.log("Database Config - User:", process.env.DB_USER);
console.log("Database Config - Password:", process.env.DB_PASSWORD ? "***" : "not set");
console.log("Database Config - Name:", process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "mysql",
  database: process.env.DB_NAME || "fitness_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
