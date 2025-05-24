const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);
