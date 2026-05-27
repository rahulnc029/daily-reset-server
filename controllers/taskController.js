import Task from "../models/Task.js";

export const getTodayTasks =
    async (req, res) => {
        try {
            const today =
                new Date()
                    .toISOString()
                    .split("T")[0];

            const tasks =
                await Task.find({
                    date: today
                }).sort({
                    phase: 1,
                    createdAt: 1
                });

            res.json(tasks);

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }
    };


export const createTask =
    async (req, res) => {
        try {

            const today =
                new Date()
                    .toISOString()
                    .split("T")[0];

            const task =
                await Task.create({
                    title:
                        req.body.title,

                    phase:
                        req.body.phase,

                    date: today
                });

            res.status(201)
                .json(task);

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }
    };


export const toggleTask =
    async (req, res) => {
        try {

            const task =
                await Task.findById(
                    req.params.id
                );

            task.completed =
                !task.completed;

            task.completedAt =
                task.completed
                    ? new Date()
                    : null;

            await task.save();

            res.json(task);

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }
    };


export const deleteTask =
    async (req, res) => {
        try {

            await Task.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message:
                    "Task deleted"
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }
    };