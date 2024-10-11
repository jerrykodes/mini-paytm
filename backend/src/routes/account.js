const { Router } = require('express')
const {
  getBalanceController,
  transferBalanceController,
} = require('../controllers/account')
const router = Router()

router.get('/balance', getBalanceController)
router.post('/transfer', transferBalanceController)

module.exports = router
