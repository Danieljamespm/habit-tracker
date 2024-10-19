//import mongoose
const mongoose = require('mongoose')


//define schema
const habitSchema = new mongoose.Schema({
    //habit name
    name : {
        type:String,
        require: true
    },
    //creation date
    createdAt: {
        type:String,
        require:true
    },
    //days the habit was done
    completedDays:{
        type:Number,
        require:true
    },
    //status of past week
    weeklyStatus:[
        {
            type:String,
            require:true
        }
    ]
})

//compiling scehma into a model
const Habits = mongoose.model('Habits', habitsSchema)

//exporting schema
module.exports = Habits