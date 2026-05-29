import mongoose, { mongo } from "mongoose";


const workoutLogSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },

    durationInSeconds: {
        type: Number,
        default: 0,
    },

    exercises: [
        {
            exerciseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercise",
            },
            name: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercise",
            },
            sets: [
                {
                    reps: {
                        type: [Number],
                        default: [0, 0, 0],
                    },
                    completed: {
                        type: Boolean,
                        default: false
                    }
                },
            ]
        },
    ],
}, { timestamps: true });

const WorkoutLog = mongoose.model("WorkoutLog", workoutLogSchema);

export default WorkoutLog;