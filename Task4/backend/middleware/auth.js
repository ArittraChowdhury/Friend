const jwt = require("jsonwebtoken");
const pool = require("../db");

async function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.userId]);
    const user = result.rows[0];

    if (!user || user.status === "blocked") {
      return res.status(403).json({ error: "Access denied" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { authMiddleware };
