const { Router } = require('express')
const { getBalanceController } = require('../controllers/account')
const router = Router()

router.get('/', getBalanceController)

module.exports = router
