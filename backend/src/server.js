import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { notFound, errorHandler } from './middleware/errorHandler.js'
import clickRoute from './routes/click.js'
import postbackRoute from './routes/postback.js'
import affiliatesRoute from './routes/affiliates.js'
import campaignsRoute from './routes/campaigns.js'

const app = express()

// Render/Vercel friendly configs
const PORT = process.env.PORT || 4000

// ✅ Lock frontend origin (fallback = Vercel deployment URL)
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || 'https://postback-mvp.vercel.app'

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ Enable CORS only for your frontend
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)

// Health check (for Render & debugging)
app.get('/health', (req, res) => res.json({ status: 'ok' }))

// Routes
app.use('/click', clickRoute)
app.use('/postback', postbackRoute)
app.use('/affiliates', affiliatesRoute)
app.use('/campaigns', campaignsRoute)

// Error middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`✅ Backend listening on port ${PORT}`)
  console.log(`🌍 Allowed origin: ${FRONTEND_ORIGIN}`)
})
