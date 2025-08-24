import 'dotenv/config'
import { Pool } from 'pg'
import { readFileSync } from 'fs'
import path from 'path'
import url from 'url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error("[db:reset] DATABASE_URL missing in .env")
  process.exit(1)
}

const pool = new Pool({ connectionString: DATABASE_URL })

async function run() {
  const client = await pool.connect()
  try {
    const schemaPath = path.join(__dirname, '../sql/schema.sql')
    const seedPath = path.join(__dirname, '../sql/seed.sql')
    const schema = readFileSync(schemaPath, 'utf-8')
    const seed = readFileSync(seedPath, 'utf-8')

    console.log("Applying schema...")
    await client.query(schema)

    console.log("Seeding base rows (affiliates, campaigns)...")
    await client.query(seed)

    // Insert a known sample click with stable ids
    // We will pick first affiliate and first campaign
    const { rows: affs } = await client.query('SELECT id FROM affiliates ORDER BY id ASC LIMIT 1')
    const { rows: camps } = await client.query('SELECT id FROM campaigns ORDER BY id ASC LIMIT 1')
    if (affs.length && camps.length) {
      const aid = affs[0].id
      const cid = camps[0].id
      await client.query(
        `INSERT INTO clicks (affiliate_id, campaign_id, click_id)
           VALUES ($1,$2,$3)
         ON CONFLICT (affiliate_id, campaign_id, click_id) DO NOTHING`,
        [aid, cid, 'abc123']
      )
      console.log(`Seeded sample click: affiliate_id=${aid}, campaign_id=${cid}, click_id=abc123`)
    }

    console.log("DB reset complete.")
  } catch (err) {
    console.error("DB reset failed:", err.message)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

run()
