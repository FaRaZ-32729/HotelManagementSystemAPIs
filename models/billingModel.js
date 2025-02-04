const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    guestId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    roomCharges: { type: Number, required: true },
    additionalCharges: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ["paid", "pending"], default: "pending" },
});

const billingModel = mongoose.model("billingSchema", billingSchema);

module.exports = billingModel