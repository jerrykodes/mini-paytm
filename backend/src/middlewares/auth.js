const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({
        type: 'error',
        message: 'Token required!!!',
      })
    }

    const token = authHeader.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    const userExists = await User.findById(userId).select('-password')

    if (!userExists) {
      return res.status(403).json({
        type: 'error',
        message: 'Invalid Token!!!',
      })
    }

    req.userId = userId
    next()
  } catch (error) {
    return res.status(403).json({
      type: 'error',
      message: 'Token expired/invalid. Kindly re-login!!!',
    })
  }
}

module.exports = authMiddleware
