import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await query('SELECT id, name FROM campaigns ORDER BY id ASC')
    res.json({ status: "success", data: rows })
  } catch (err) {
    next(err)
  }
})

export default router
