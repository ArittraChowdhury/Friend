const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all users (sorted by last_login_time)
router.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT id, name, email, last_login_time, status FROM users ORDER BY last_login_time DESC"
  );
  res.json(result.rows);
});

// Block users
router.post("/block", async (req, res) => {
  const { ids } = req.body;
  await pool.query("UPDATE users SET status = 'blocked' WHERE id = ANY($1)", [ids]);
  res.json({ message: "Users blocked" });
});

// Unblock users
router.post("/unblock", async (req, res) => {
  const { ids } = req.body;
  await pool.query("UPDATE users SET status = 'active' WHERE id = ANY($1)", [ids]);
  res.json({ message: "Users unblocked" });
});

// Delete users
router.post("/delete", async (req, res) => {
  const { ids } = req.body;
  await pool.query("DELETE FROM users WHERE id = ANY($1)", [ids]);
  res.json({ message: "Users deleted" });
});

module.exports = router;
