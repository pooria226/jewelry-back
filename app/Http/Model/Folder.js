const mongoose = require("mongoose");

const folder = mongoose.Schema({
  name: { type: String, required: true },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  created_at: { type: Date, default: Date.now() },
  updated_ay: { type: Date, default: null },
});

const Folder = mongoose.model("Folder", folder);

module.exports = Folder;
