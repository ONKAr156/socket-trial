import mongoose from "mongoose";

const countData = new mongoose.Schema({
    value: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


const dbValue = mongoose.model("Count", countData)
export default dbValue