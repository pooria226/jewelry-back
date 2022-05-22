const mongoose = require("mongoose");

const user = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  phone: { type: String, required: true, unique: true },
  avatar: String,
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["admin", "user", "bloger"],
  },
  code: { type: String, default: null },
  created_code: { type: Date, default: null },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const User = mongoose.models.User || mongoose.model("User", user);

module.exports = User;
