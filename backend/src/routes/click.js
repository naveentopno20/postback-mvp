import { Router } from 'express'
import { query } from '../db.js'
import { requireQueryParams, parseIntStrict } from '../utils/validate.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    requireQueryParams(req, ['affiliate_id', 'campaign_id', 'click_id'])
    const affiliate_id = parseIntStrict(req.query.affiliate_id, 'affiliate_id')
    const campaign_id = parseIntStrict(req.query.campaign_id, 'campaign_id')
    const click_code = String(req.query.click_id).trim()

    if (click_code.length < 3 || click_code.length > 128) {
      const e = new Error("click_id must be between 3 and 128 characters")
      e.status = 400
      throw e
    }

    // Validate affiliate & campaign exist
    const { rowCount: affExists } = await query('SELECT 1 FROM affiliates WHERE id = $1', [affiliate_id])
    if (!affExists) {
      const e = new Error("affiliate not found")
      e.status = 404
      throw e
    }
    const { rowCount: campExists } = await query('SELECT 1 FROM campaigns WHERE id = $1', [campaign_id])
    if (!campExists) {
      const e = new Error("campaign not found")
      e.status = 404
      throw e
    }

    // Insert (idempotent by unique constraint)
    const sql = `INSERT INTO clicks (affiliate_id, campaign_id, click_id)
                 VALUES ($1, $2, $3)
                 ON CONFLICT (affiliate_id, campaign_id, click_id) DO UPDATE SET click_id = EXCLUDED.click_id
                 RETURNING id, affiliate_id, campaign_id, click_id, ts`
    const { rows } = await query(sql, [affiliate_id, campaign_id, click_code])

    res.json({
      status: "success",
      message: "Click recorded",
      data: rows[0]
    })
  } catch (err) {
    next(err)
  }
})

export default router
