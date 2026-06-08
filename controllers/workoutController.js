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
        sets: req.body.sets,
        reps: req.body.reps,
        order: count + 1,
    });
    res.status(201).json(exercise);
};

export const deleteExercise = async (req, res) => {
    await Exercise.findByIdAndDelete(req.params.id);

    res.json({ message: "Exercise deleted" });
};

export const saveWorkout = async (req, res) => {
    try {
        const today = new Date()
            .toISOString()
            .split("T")[0];

        const existingWorkout =
            await WorkoutLog.findOne({
                date: today,
            });

        if (existingWorkout) {
            return res.status(400).json({
                message:
                    "Workout already saved for today",
            });
        }

        const exercises =
            req.body.exercises;

        const completed =
            exercises.every((exercise) =>
                exercise.sets.every(
                    (set) =>
                        set.completed === true
                )
            );

        if (!completed) {
            return res.status(400).json({
                message:
                    "Complete all sets before saving workout",
            });
        }

        const workout =
            await WorkoutLog.create({
                date: today,
                exercises,
                durationInSeconds:
                    req.body.durationInSeconds,
                completed: true,
            });

        res.status(201).json(workout);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:
                "Error saving workout",
        });
    }
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

export const getWorkoutLogs = async (req, res) => {
    const logs = await WorkoutLog.find().sort({ date: 1, });
    res.json(logs);
};