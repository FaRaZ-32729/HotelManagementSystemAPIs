const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomType: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "booked", "cleaning", "under maintenance"],
      default: "available",
    },
    pricePerNight: { type: Number, required: true },
    capacity: { type: Number, required: true },
  });


const Room = mongoose.model("Room" , roomSchema);

module.exports = Room;