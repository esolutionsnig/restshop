const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user')
const checkAuth = require('../middleware/check-auth')

// Sign Up Route
router.post('/signup', UserController.user_sign_up)

// Log User In
router.post('/login', UserController.user_sign_in)

// Remove User
router.delete('/:userId', UserController.user_delete)

module.exports = router