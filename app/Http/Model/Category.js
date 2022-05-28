const mongoose = require("mongoose");

const category = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ref: { type: mongoose.Schema.Types.ObjectId, refPath: "model" },
  model: { type: String, required: true, enum: ["blog", "product"] },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: null },
});

const Category = mongoose.model("Category", category);

module.exports = Category;
