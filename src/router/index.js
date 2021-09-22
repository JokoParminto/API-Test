const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const user = require('./user')

router.use(authController.checkAuth)
router.use('/user', user)
module.exports = router
