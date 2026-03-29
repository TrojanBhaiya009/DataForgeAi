import cors from 'cors'
import express from 'express'
import { config } from './config.js'
import { healthRouter } from './routes/health.js'
import { inferenceRouter } from './routes/inference.js'

export const app = express()

app.use(
  cors({
    origin: config.frontendOrigin,
    credentials: true,
  }),
)

app.use(express.json({ limit: '1mb' }))

app.get('/api', (_req, res) => {
  res.status(200).json({
    name: 'AIP05 API',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/inference'],
  })
})

app.use('/api/health', healthRouter)
app.use('/api/inference', inferenceRouter)

app.use((_req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested route does not exist.',
  })
})
