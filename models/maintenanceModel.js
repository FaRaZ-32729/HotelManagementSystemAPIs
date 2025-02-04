const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    issueDescription: { type: String, required: true },
    status: {
        type: String,
        enum: ["reported", "in progress", "resolved"],
        default: "reported",
    },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const maintenanceModel = mongoose.model("maintenanceSchema", maintenanceSchema);
module.exports = maintenanceModel