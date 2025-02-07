const roomModel = require("../models/roomModel");

const addRoom = async (req, res) => {
    try {
        const { roomType, status, pricePerNight, capacity } = req.body;

        const newRoom = await roomModel.create({
            roomType,
            status,
            pricePerNight,
            capacity
        });

        return res.status(200).json({ msg: "Room Added Successfully", room: newRoom });

    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Creating the Room", error: error.message });
    }
};

const getAllRoom = async (req, res) => {
    try {
        const rooms = await roomModel.find();
        return res.status(200).json({ rooms });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Fetching Rooms", error: error.message });
    }
};

const getSingleRoom = async (req, res) => {
    try {
        const room = await roomModel.findById(req.params.id);
        return res.status(200).json({ room });
    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Fetching Room", error: error.message });
    }
};

const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await roomModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedRoom) return res.status(404).json({ msg: "No Room Found" });

        return res.status(200).json({ msg: "Room Updated Successfully", room: updatedRoom });

    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Updating The Room", error: error.message });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const deletedRoom = await roomModel.findByIdAndDelete(req.params.id);
        if (!deletedRoom) return res.status(404).json({ msg: "No Room Found" });

        return res.status(200).json({ msg: "Room Deleted Successfully" });

    } catch (error) {
        return res.status(500).json({ msg: "Error Occurred While Deleting The Room", error: error.message });
    }
};

module.exports = { addRoom, getSingleRoom, getAllRoom, updateRoom, deleteRoom };
