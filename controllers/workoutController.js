import Exercise from "../models/Exercise.js";
import WorkoutLog from "../models/WorkoutLog.js";


export const getExercises = async (req, res) => {
    const exercises = await Exercise.find({
        active: true,
    }).sort({
        order: 1,
    });
    res.json(exercises);
};

export const createExercise = async (req, res) => {
    const count = await Exercise.countDocuments();
    const exercise = await Exercise.create({
        name: req.body.name,
        sets: req.body.sets || [0, 0, 0],
        order: count + 1,
    });
    res.status(201).json(exercise);
};

export const deleteExercise = async (req, res) => {
    await Exercise.findByIdAndDelete(req.params.id);

    res.json({ message: "Exercise deleted" });
};

export const saveWorkout = async (req, res) => {
    const today = new Date().toISOString().split("T")[0];

    const workout = await WorkoutLog.findOneAndUpdate(
        { date: today },
        {
            date: today,
            exercises: req.body.exercises,
            durationInSeconds: req.body.durationInSeconds,
        },
        {
            upsert: true,
            new: true,
        }
    );
    res.json(workout);
};


export const getTodayWorkout = async (req, res) => {
    const today = new Date().toISOString().split("T")[0];
    const workout = await WorkoutLog.findOne({ date: today, });
    res.json(workout);
};

export const updateExercise = async (req, res) => {
    const exercise = await Exercise.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            sets: req.body.sets,
        },
        {
            new: true,
        }
    );
    res.json(exercise);
};