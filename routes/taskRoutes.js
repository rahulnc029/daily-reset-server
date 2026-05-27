import express from "express";

import {
    getTodayTasks,
    createTask,
    toggleTask,
    deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTodayTasks);

router.post("/", createTask);

router.patch("/:id/toggle", toggleTask);

router.delete("/:id", deleteTask);

export default router;