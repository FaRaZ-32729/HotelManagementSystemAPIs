const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "staff", "guest"], default: "guest" },
  subRole: {
    type: String,
    enum: ["manager", "receptionist", "housekeeping"],
    // required: function () { return this.role === "staff"; },
    default: function () {
      return this.role === "staff" ? null : undefined; // Set to null if role is staff
    },
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;