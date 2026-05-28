import mongoose from "mongoose";


const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    order: {
        type: Number,
        required: true,
    },

    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;