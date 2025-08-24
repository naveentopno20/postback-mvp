import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await query('SELECT id, name FROM affiliates ORDER BY id ASC')
    res.json({ status: "success", data: rows })
  } catch (err) {
    next(err)
  }
})

router.get('/:id/clicks', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
      const e = new Error("affiliate id must be an integer")
      e.status = 400
      throw e
    }
    const { rows } = await query(
      `SELECT c.id, c.click_id, c.campaign_id, c.ts, ca.name as campaign_name
         FROM clicks c
         JOIN campaigns ca ON c.campaign_id = ca.id
        WHERE c.affiliate_id = $1
        ORDER BY c.ts DESC`,
      [id]
    )
    res.json({ status: "success", data: rows })
  } catch (err) {
    next(err)
  }
})

router.get('/:id/conversions', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
      const e = new Error("affiliate id must be an integer")
      e.status = 400
      throw e
    }
    const { rows } = await query(
      `SELECT v.id, v.amount, v.currency, v.ts, c.click_id as click_code, c.campaign_id
         FROM conversions v
         JOIN clicks c ON v.click_id = c.id
        WHERE c.affiliate_id = $1
        ORDER BY v.ts DESC`,
      [id]
    )
    res.json({ status: "success", data: rows })
  } catch (err) {
    next(err)
  }
})

export default router
