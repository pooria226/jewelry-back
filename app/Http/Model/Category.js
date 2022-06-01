const mongoose = require("mongoose");

const category = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  ref: { type: mongoose.Schema.Types.ObjectId, refPath: "model" },
  model: { type: String, required: true, enum: ["blog", "product"] },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Category = mongoose.model("Category", category);

module.exports = Category;
