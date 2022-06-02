const mongoose = require("mongoose");

const product = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  carat: { type: Number, required: true },
  image_origin: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Product = mongoose.model("Product", product);

module.exports = Product;
