const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  content: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  answer: { type: String },
  model: { type: String, required: true, enum: ["blog", "product"] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  target: {
    type: Object,
    required: true,
  },
  user_answer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hasAnswered: { type: Boolean, default: false },
  answerd_at: { type: Date },
  created_at: { type: Date, default: Date.now() },
});
const Comment = mongoose.model("Comment", comment);
module.exports = Comment;
