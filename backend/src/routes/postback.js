import { Router } from 'express'
import { query } from '../db.js'
import { requireQueryParams, parseIntStrict, parseAmount, parseCurrency } from '../utils/validate.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    requireQueryParams(req, ['affiliate_id', 'click_id', 'amount', 'currency'])
    const affiliate_id = parseIntStrict(req.query.affiliate_id, 'affiliate_id')
    const click_code = String(req.query.click_id).trim()
    const amount = parseAmount(req.query.amount)
    const currency = parseCurrency(req.query.currency)

    // Find matching click for affiliate + click_id string
    const { rows: clicks } = await query(
      `SELECT id FROM clicks WHERE affiliate_id = $1 AND click_id = $2`,
      [affiliate_id, click_code]
    )
    if (!clicks.length) {
      const e = new Error("No matching click found for given affiliate_id and click_id")
      e.status = 404
      throw e
    }
    const clickRowId = clicks[0].id

    // Create conversion
    const ins = await query(
      `INSERT INTO conversions (click_id, amount, currency)
       VALUES ($1, $2, $3)
       RETURNING id, click_id, amount, currency, ts`,
      [clickRowId, amount, currency]
    )
    res.json({
      status: "success",
      message: "Conversion tracked",
      data: ins.rows[0]
    })
  } catch (err) {
    next(err)
  }
})

export default router
