const Blog = require('../models/Blog');
const View = require('../models/View');

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const blog = new Blog({ 
      title, 
      content, 
      author: {
        id: req.user.id,
        username: req.user.username
      }
    });
    await blog.save();

    const blogView = new View({ blogId: blog._id });
    await blogView.save();

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    if (blog.author.id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized to delete this blog' });
    }
    
    await Blog.findByIdAndDelete(req.params.id);
    await View.findOneAndDelete({ blogId: req.params.id });
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Increment blog views
exports.incrementViews = async (req, res) => {
  const { blogId } = req.params;
  
  try {
    const view = await View.findOne({ blogId });

    if (view) {
      view.views++;
      await view.save();
    } else {
      const newView = new View({ blogId, views: 1 });
      await newView.save();
    }

    res.status(200).json({ message: 'View count incremented' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
