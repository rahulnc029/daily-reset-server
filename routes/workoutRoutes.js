import express from "express";
import { getExercises, createExercise, deleteExercise, saveWorkout, getTodayWorkout, updateExercise, getWorkoutLogs } from "../controllers/workoutController.js";


const router = express.Router();

router.get("/exercises", getExercises);
router.post("/exercises", createExercise);
router.delete("/exercises/:id", deleteExercise);
router.get("/today", getTodayWorkout);
router.post("/today", saveWorkout);
router.patch("/exercises/:id", updateExercise);
router.get("/logs", getWorkoutLogs);

export default router;