const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomType: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "occupied", "cleaning", "maintenance"],
      default: "available",
    },
    pricePerNight: { type: Number, required: true },
    capacity: { type: Number, required: true },
  });


const Room = mongoose.model("Room" , roomSchema);

module.exports = Room;