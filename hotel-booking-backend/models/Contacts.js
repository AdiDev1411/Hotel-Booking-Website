const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,     // ✅ Correct placement
    trim: true
  },
  email: {
    type: String,
    required: true,     // ✅ Correct placement
    trim: true,
    lowercase: true
  },
  number: {
    type: String,
    required: true,     // ✅ Correct placement
    trim: true
  },
  message: {
    type: String,
    required: true,     // ✅ Correct placement
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
