const mongoose = require("mongoose");

const blog = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
  like: { type: Number, default: 0 },
  view: { type: Number, default: 0 },
  image_origin: { type: String, require: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  description: { type: String, require: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  author: {
    _id: { type: mongoose.Schema.Types.ObjectId, require: true },
    fullname: { type: String, require: true },
  },
  user_like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  published_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Blog = mongoose.model("Blog", blog);

module.exports = Blog;
