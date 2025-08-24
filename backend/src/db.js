import 'dotenv/config'
import { Pool } from 'pg'

const { DATABASE_URL } = process.env
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set. Please create .env file from .env.example")
  process.exit(1)
}

export const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  ssl: {
    rejectUnauthorized: false  // ✅ Needed for Render PostgreSQL
  }
})

export async function query(text, params) {
  try {
    const res = await pool.query(text, params)
    return res
  } catch (err) {
    // Central DB error handling
    console.error("[DB ERROR]", err.message)
    throw err
  }
}
