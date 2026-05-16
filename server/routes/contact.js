const express = require('express')
const { body, validationResult } = require('express-validator')
const Contact = require('../models/Contact')

const router = express.Router()

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }
    try {
      const { name, email, subject, message } = req.body
      const contact = await Contact.create({ name, email, subject, message })
      res.status(201).json({ success: true, message: 'Message received!', id: contact._id })
    } catch (err) {
      console.error('Contact POST error:', err)
      res.status(500).json({ success: false, message: 'Server error. Please try again.' })
    }
  }
)

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50)
    res.json({ success: true, data: contacts })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

module.exports = router
