const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  content: { type: String, required: true },
  published: { type: Boolean, default: false },
  answer: { type: String },
  ref: { type: mongoose.Schema.Types.ObjectId, refPath: "model" },
  model: { type: String, required: true, enum: ["blog", "product"] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userAnswer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answerdAt: { type: Date },
  createdAt: { type: Date, default: Date.now() },
});
const Comment = mongoose.model("Comment", comment);
module.exports = Comment;
