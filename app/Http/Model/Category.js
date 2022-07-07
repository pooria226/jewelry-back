const mongoose = require("mongoose");

const category = mongoose.Schema({
  title: { type: String, required: true, unique: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  position: { type: String, enum: ["blog", "product"], require: true },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Category = mongoose.model("Category", category);

module.exports = Category;
