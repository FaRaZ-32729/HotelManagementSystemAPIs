const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
    guestId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comments: { type: String },
});


const feedBackModel = mongoose.model("feedBackSchema", feedBackSchema);

module.exports = feedBackModel;