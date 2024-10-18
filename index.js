const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/database')
const expressLayouts= require('express-ejs-layouts')
const mainRoutes = require('./routes/main')
const habitRoutes = require('./routes/habits')





require('dotenv').config({path: './config/.env'})

connectDB()

//Setting view engine as ejs and extracting styelsheets/scripts for individual pages
app.set('view engine', 'ejs')
app.set('views', './views')
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

//for data passed inside url
app.use(express.urlencoded({extended: true}))

// static folder
app.use(express.static('public'))

//using layouts
app.use(expressLayouts)

//setting up routes
app.use('/', mainRoutes)
// app.use('/habits', habitRoutes)









app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})
