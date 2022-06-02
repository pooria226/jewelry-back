const mongoose = require("mongoose");

const blog = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  like: { type: Number, default: 0 },
  view: { type: Number, default: 0 },
  image_origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    require: true,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user_like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Blog = mongoose.model("Blog", blog);

module.exports = Blog;
