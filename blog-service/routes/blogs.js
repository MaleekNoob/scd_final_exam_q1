const express = require('express');
const { createBlog, getBlogs, getBlogById, deleteBlog, incrementViews } = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, createBlog); 
router.get('/', getBlogs); 
router.get('/:id', getBlogById); 
router.delete('/:id', authMiddleware, deleteBlog); 
router.post('/view/:blogId', incrementViews); 

module.exports = router;
