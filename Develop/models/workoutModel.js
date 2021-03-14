const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },

    exercises: [{

        type: {
            type: String,
            trim: true
        },

        name: {
            type: String,
            trim: true,
            required: 'Please enter name of exercise'
        },

        duration: {
            type: Number,
            default: 0,
        },

        weight: {
            type: Number,
            default: 0,
        },

        reps: {
            type: Number,
            default: 0,
        },

        sets: {
            type: Number,
            default: 0,
        }

    }]
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout; 