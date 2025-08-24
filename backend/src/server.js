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
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*'

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ allow CORS for frontend (later lock this to your deployed Vercel domain)
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: false
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
})
