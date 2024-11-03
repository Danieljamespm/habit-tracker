//habits model for storing habit data
const Habits = require('../models/habits')


module.exports = {
    
    home: async (req,res)=>{
        try {
            //getting all the habits from database
            //rendering homepage
            const myHabits = await Habits.find({})
            res.render('home.ejs', {
                
                //giving all the habits a variable name
                myHabits: myHabits
            })
            
        } catch (err) {
            console.log(err)
        }

    },
    createHabit: async (req,res)=>{
        try {
            //get today's date
            let date = new Date().toString()
            date = `${date.slice(4,15)}`
            //weekly dates
            const weekStatus = Array(7).fill(null)

            //create new habit in MongoDB
            const doc = await Habits.create({
                name:req.body.newHabit,
                createdAt:date,
                weeklyStatus:weekStatus,
                completedDays:0
            })
            console.log(`Habit ${req.body.newHabit} has been added!`)
            //return response
            res.redirect('/')

        } catch (err) {
            console.log(err)
        }
    },
    deleteHabit : async (req, res)=>{
        console.log(req.body.habitIDFromJSFile)
        try {
            await Habits.findOneAndDelete({_id:req.body.habitIDFromJSFile})
            console.log(`Deleted Habit ${req.body.habitIDFromJSFile}`)
            res.json('Deleted It')
        } catch (err) {
            console.log(err)
        }
    }
}