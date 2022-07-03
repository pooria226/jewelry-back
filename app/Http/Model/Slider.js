const mongoose = require("mongoose");

const slider = new mongoose.Schema({
  image: { type: String, required: true },
  link: { type: String, default: null },
  position: {
    type: String,
    enum: ["homeSlider", "homeLaser", "homeBanner"],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Slider = mongoose.models.Slider || mongoose.model("Slider", slider);

module.exports = Slider;
