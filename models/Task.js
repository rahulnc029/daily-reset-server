import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    phase: {
        type: String,
        enum: [
            "morning",
            "afternoon",
            "evening"
        ],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default: null
    },
    order: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;