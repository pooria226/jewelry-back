const mongoose = require("mongoose");
const like = mongoose.Schema({
  target_id: { type: String, required: true },
  position: { type: String, enum: ["blog", "product"], require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});
const Like = mongoose.model("Like", like);
module.exports = Like;
