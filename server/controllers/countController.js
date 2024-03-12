import Express from "express"
import asynchandler from "express-async-handler"
import Count from "../model/countModel.js"


export const getCountValue = asynchandler(async (req, res) => {
    try {
        const result = await Count.findOne({});
        res.status(200).json({ message: "Count values fetched successfully", data: result });
    } catch (error) {
        console.error("Error while fetching count values:", error);
        res.status(500).json({ message: "Error while fetching count values" });
    }
});

export const addCountEntry = asynchandler(async (req, res) => {
    try {
        const newCount = new Count();
        const result = await newCount.save();

        res.status(201).json({ message: "New count entry created successfully", data: result });
    } catch (error) {
        console.error("Error while creating new count entry:", error);
        res.status(500).json({ message: "Error while creating new count entry" });
    }
});

export const updateCountValue = asynchandler(async (req, res) => {
    try {
        const updatedCount = await Count.findOneAndUpdate({}, { $inc: { value: 1 } }, { new: true });

        if (updatedCount) {
            res.status(200).json({ message: "Count value incremented successfully", data: updatedCount });
        } else {
            res.status(404).json({ message: "No count document found to update" });
        }
    } catch (error) {
        console.error("Error while incrementing count value:", error);
        res.status(500).json({ message: "Error while incrementing count value" });
    }
});

