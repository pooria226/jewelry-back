const mongoose = require("mongoose");

const tag = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Tag = mongoose.model("Tag", tag);

module.exports = Tag;
