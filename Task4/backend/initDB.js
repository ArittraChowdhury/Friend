// backend/initDB.js
import pool from './db.js';

async function initDB() {
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
}

initDB().catch(console.error);
