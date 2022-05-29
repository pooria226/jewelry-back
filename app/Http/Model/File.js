const mongoose = require("mongoose");
const file = mongoose.Schema({
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
const File = mongoose.model("File", file);
module.exports = File;
