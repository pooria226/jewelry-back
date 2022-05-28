const mongoose = require("mongoose");

const blog = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String, required: true },
  like: { type: Number },
  view: { type: Number },
  imageOrigin: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  categorys: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user_like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: null },
});

const Blog = mongoose.model("Blog", blog);

module.exports = Blog;
