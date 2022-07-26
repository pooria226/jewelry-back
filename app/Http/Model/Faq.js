const mongoose = require("mongoose");

const faq = mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Faq = mongoose.model("Faq", faq);

module.exports = Faq;
