const mongoose = require("mongoose");

const favorite = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});
const Favorite = mongoose.model("Favorite", favorite);
module.exports = Favorite;
