// models/Housekeeping.js
const mongoose = require("mongoose");

const housekeepingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskStatus: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  scheduledTime: { type: Date, required: true },
  completedTime: { type: Date },
});

const housekeepingModel = mongoose.model("housekeepingSchema", housekeepingSchema);
module.exports = housekeepingModel