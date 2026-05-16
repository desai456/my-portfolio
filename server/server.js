require('dotenv').config()
const express    = require('express')
const cors       = require('cors')
const mongoose   = require('mongoose')
const rateLimit  = require('express-rate-limit')
const contactRoutes = require('./routes/contact')

const app  = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many requests, please try again later.' },
})
app.use('/api/contact', limiter)

app.use('/api/contact', contactRoutes)

app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'Portfolio API running', timestamp: new Date().toISOString() })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' })
})

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio'

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message)
    app.listen(PORT, () => console.log(`⚠️  Server running WITHOUT DB on http://localhost:${PORT}`))
  })
