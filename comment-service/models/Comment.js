const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  blogId: { type: String, required: true },
  content: { type: String, required: true },
  author: { 
    id: { type: String, required: true },
    username: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
