const express = require('express')
const router = express.Router()
const homeController = require('../controller/home')

//route for homepage
router.get('/', homeController.home)

//route for post request to create habits
router.post('/createHabit', homeController.createHabit)

router.delete('/deleteHabit', homeController.deleteHabit)


module.exports = router