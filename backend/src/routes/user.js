const { Router } = require('express')
const {
  updateUserController,
  searchUsersController,
} = require('../controllers/user')

const router = Router()

router.patch('/', updateUserController)
router.get('/search', searchUsersController)

module.exports = router
