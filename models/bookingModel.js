const mongoose = require("mongoose");
const User = require("./userModel");
const Room = require("./roomModel");

const bookingSchema = new mongoose.Schema({
    guestId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true },
    status: {
        type: String,
        enum: ["confirmed", "canceled", "checked-in", "checked-out"],
        default: "confirmed",
    },
    totalAmount: { type: Number, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;