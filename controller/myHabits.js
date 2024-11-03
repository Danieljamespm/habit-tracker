
// importing Habits model for the DB
const Habits = require('../models/habits')

// get list of all the days and the dates from previous week
const CalculateDayOfWeek = (date) => {
    //storing all the dates and days into an array
    let days = new Array()
    //putting them in ascending order
    for(let i = 6; i >= 0; i--){
        //store values as a string
        days[6-i] = new Date(date.getFullYear(), date.getMonth(), date.getDate() - i).toString()
        days[6-i] = `${days[6-i].slice(0,4)}, ${days[6-i].slice(4,11)}`
    }
    //return array of dates
    return days
}

module.exports = {

    home: async (req,res) => {
        try {
            //today's date
            let date = new Date().toString()
            //getting only the date
            date = `${date.slice(0,3)}, ${date.slice(3,15)}`

            //days of past weeek
            const pastWeek = CalculateDayOfWeek(new Date())

            //getting the habits from DB
            const myHabits = await Habits.find({})

            //render the habits
            return res.render('habits', {
                //today's date
                date:date,
                //habits
                myHabits:myHabits,
                //past week date
                weekDays:pastWeek
            })

        } catch (err) {
            console.log(err)
            res.redirect('/')
        }
    },
    //toggling status of habit on specific day
    toggleStatus: async (req,res) => {
        try {
            //get id of habit
            let id = req.query.id

            //index of week day
            let index = req.query.i

            //new status of habit
            let status = req.query.status

            //find the habit in DB
            const habit = await Habits.findOne({_id:id})

            // fire if done
            if(status === 'true'){
                //if not already done update the status
                if(habit.weeklyStatus[index] !== 'true'){
                    //increase the number of days completed
                    habit.completedDays = habit.completedDays + 1
                }
            }
            //if new status is not done / waiting
            else{
                //if task was previsouly done
                if(habit.weeklyStatus[index] === 'true'){
                    //reduce number of days completed
                    habit.completedDays = habit.completedDays -1
                }
            }

            //update task status
            habit.weeklyStatus[index] = status
            //save in DB
            await habit.save()
            //return response
            return res.redirect('/')
        } catch (err) {
            console.log(err.message)
            res.redirect('back')
        }
    }

}