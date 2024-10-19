const express = require('express')
const router = express.Router()
const homeController = require('../controller/home')

router.get('/', homeController.home)
router.post('/createHabit', homeController.createHabit)


module.exports = router