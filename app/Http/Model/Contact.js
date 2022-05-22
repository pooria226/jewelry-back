const mongoose = require("mongoose");

const contact = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String, required: true },
  content: { type: String, required: true },
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contact);

module.exports = Contact;
