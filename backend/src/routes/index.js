const { Router } = require('express')
const userRoutes = require('./user')
const authRoutes = require('./auth')
const authMiddleware = require('../middlewares/auth')

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', authMiddleware, userRoutes)

module.exports = router
