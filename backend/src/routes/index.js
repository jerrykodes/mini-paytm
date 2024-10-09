const { Router } = require('express')
const accountRoutes = require('./account')
const userRoutes = require('./user')
const authRoutes = require('./auth')
const authMiddleware = require('../middlewares/auth')

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', authMiddleware, userRoutes)
router.use('/account', authMiddleware, accountRoutes)

module.exports = router
