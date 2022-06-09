const mongoose = require("mongoose");

const team = new mongoose.Schema({
  first_name: { type: String, required: true, default: null },
  last_name: { type: String, required: true, default: null },
  avatar: { type: String, required: true },
  post: { type: String, required: true, default: null },
  email: { type: String, default: null },
  telegram: { type: String, default: null },
  whatsapp: { type: String, default: null },
  instagram: { type: String, default: null },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Team = mongoose.models.Team || mongoose.model("Team", team);

module.exports = Team;
