// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// // Get all users
// router.get('/users', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT id, name, email, status FROM users ORDER BY id ASC');
//     res.json(result.rows);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });
// GET all users
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Block a user
router.put('/users/:id/block', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE users SET status = $1 WHERE id = $2', ['blocked', id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error blocking user:', err);
    res.status(500).json({ error: 'Failed to block user' });
  }
});

// Unblock a user
router.put('/users/:id/unblock', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE users SET status = $1 WHERE id = $2', ['active', id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error unblocking user:', err);
    res.status(500).json({ error: 'Failed to unblock user' });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
