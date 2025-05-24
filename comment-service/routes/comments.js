const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, addComment);
router.get('/:blogId', getComments);

module.exports = router;
