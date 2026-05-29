import express from "express";
import { getExercises, createExercise, deleteExercise, saveWorkout, getTodayWorkout, updateExercise } from "../controllers/workoutController.js";


const router = express.Router();

router.get("/exercises", getExercises);
router.post("/exercises", createExercise);
router.delete("/exercises/:id", deleteExercise);
router.get("/today", getTodayWorkout);
router.post("/today", saveWorkout);
router.patch("/exercises/:id", updateExercise);

export default router;