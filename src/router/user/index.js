const express = require('express')
const router = express.Router()

const authController = require('../../controller/authController')
const user = require('../../controller/userController')

router.post('/register', authController.register)
router.get('/list', user.getAll)
router.get('/detail', user.detail)
router.post('/update', user.update)


module.exports = router