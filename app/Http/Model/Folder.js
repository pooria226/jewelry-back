const mongoose = require("mongoose");

const folder = mongoose.Schema({
  name: { type: String, required: true },
  folder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: null },
});

const Folder = mongoose.model("Folder", folder);

module.exports = Folder;
