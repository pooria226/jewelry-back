const mongoose = require("mongoose");

const user = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  phone: { type: String, required: true, unique: true },
  avatar: { type: String, default: null },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["admin", "user", "bloger"],
  },
  code_meli: { type: String, default: null },
  date_of_birth: { type: String, default: null },
  address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
  code: { type: String, default: null },
  created_code: { type: Date, default: null },
  isVerifyed: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const User = mongoose.models.User || mongoose.model("User", user);

module.exports = User;
