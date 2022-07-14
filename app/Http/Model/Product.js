const mongoose = require("mongoose");

const product = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  percentage: { type: Number, required: true },
  isPublished: { type: Boolean, default: false },
  weight: { type: Number, required: true },
  image_origin: { type: String },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  view: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  description: { type: String, default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  created_at: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
  published_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
});

const Product = mongoose.model("Product", product);

module.exports = Product;
