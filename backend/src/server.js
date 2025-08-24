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

const PORT = process.env.PORT || 4000
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000'

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: false }))

app.get('/health', (req, res) => res.json({ status: "ok" }))

app.use('/click', clickRoute)
app.use('/postback', postbackRoute)
app.use('/affiliates', affiliatesRoute)
app.use('/campaigns', campaignsRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`)
})
