//importing express
const express = require('express')

//creating new router
const router = express.Router()

// variable to route to habit controller
const myHabitsController = require('../controller/myHabits')

//get reqeust controller for main page
router.get('/', myHabitsController.home)

//route to change habit status
router.get('/toggle-status', myHabitsController.toggleStatus)

module.exports = router