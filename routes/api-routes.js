// requiring in the model folder and Router method from express
const db = require("../models");
const router = require("express").Router();


// route to get the last workout inputted 
router.get("/api/workouts", (req, res) => {

    // finding all the exercises saved in the workout db
    db.Workout.find({}).then(dbWorkout => {
        // for each workout in workout db
        dbWorkout.forEach(workout => {
            // assign the variable total to 0
            let total = 0;
            // for each exercise inside of workout 
            workout.exercises.forEach(e => {
                // total is equal to the total variable plus the duration of each exercise inside of the workout
                total += e.duration;
            });
            // assign the totalDuration key inside of the workout to the variable of total
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});


//route to add a new exercise to a workout 
router.put("/api/workouts/:id", (req, res) => {

    // finding an certain workout by it's id and updating that workout 
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            // including in the totalDuration key to the updated workout 
            $inc: { totalDuration: req.body.duration },
            // pushing all exercises to the updated workouts 
           
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

});



//route to create a new workout 
router.post("/api/workouts", (req, res) => {
  
    // creating a new workout inside workout db
    db.Workout.create({}).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
    });
});



// route to get the range of all workouts by range 
router.get("/api/workouts/range", (req, res) => {

    // finding all workouts in workout db
    db.Workout.find({}).then(dbWorkout => {

        // console logging out all workouts 
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });

});

// exporting out all routes 
module.exports = router;