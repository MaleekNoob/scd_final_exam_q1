const Comment = require('../models/Comment');
const axios = require('axios');

exports.addComment = async (req, res) => {
  const { blogId, content } = req.body;

  try {
    try {
      await axios.get(`${process.env.BLOG_SERVICE_URL}/api/blogs/${blogId}`);
    } catch (error) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = new Comment({
      blogId,
      content,
      author: {
        id: req.user.id,
        username: req.user.username
      }
    });

    await comment.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
