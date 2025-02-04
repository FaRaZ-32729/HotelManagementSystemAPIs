const housekeepingModel = require("../models/houseKeepingModel");

// ✅ Add Housekeeping Task
const addHousekeepingTask = async (req, res) => {
    try {
        const housekeepingTask = await housekeepingModel.create(req.body);
        return res.status(201).json({ msg: "Housekeeping Task Added Successfully", housekeepingTask });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Creating Housekeeping Task", error: error.message });
    }
};

// ✅ Get All Housekeeping Tasks
const getAllHousekeepingTasks = async (req, res) => {
    try {
        const tasks = await housekeepingModel.find().populate("roomId").populate("assignedTo");
        return res.status(200).json({ housekeepingTasks: tasks });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Fetching Housekeeping Tasks", error: error.message });
    }
};

// ✅ Get Single Housekeeping Task by ID
const getHousekeepingTaskById = async (req, res) => {
    try {
        const task = await housekeepingModel.findById(req.params.id).populate("roomId").populate("assignedTo");
        if (!task) return res.status(404).json({ msg: "Housekeeping Task Not Found" });

        return res.status(200).json({ housekeepingTask: task });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Fetching Task", error: error.message });
    }
};

// ✅ Update Housekeeping Task
const updateHousekeepingTask = async (req, res) => {
    try {
        const updatedTask = await housekeepingModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ msg: "Housekeeping Task Not Found" });

        return res.status(200).json({ msg: "Housekeeping Task Updated Successfully", housekeepingTask: updatedTask });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Updating Task", error: error.message });
    }
};

// ✅ Delete Housekeeping Task
const deleteHousekeepingTask = async (req, res) => {
    try {
        const deletedTask = await housekeepingModel.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ msg: "Housekeeping Task Not Found" });

        return res.status(200).json({ msg: "Housekeeping Task Deleted Successfully", housekeepingTask: deletedTask });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Deleting Task", error: error.message });
    }
};

module.exports = { addHousekeepingTask, getAllHousekeepingTasks, getHousekeepingTaskById, updateHousekeepingTask, deleteHousekeepingTask };
