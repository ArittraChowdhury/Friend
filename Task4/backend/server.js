const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const { authMiddleware } = require("./middleware/auth");
const adminRoutes = require("./routes/admin");
const pool = require("./db"); // your DB connection

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Create table if not exists at startup
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        last_login_time TIMESTAMP
      );
    `);
    console.log("✅ Users table ready");
  } catch (err) {
    console.error("❌ Error creating users table:", err);
  }
})();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
