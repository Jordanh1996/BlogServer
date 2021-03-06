const express = require('express');
const { authenticate } = require('../../middleware/authenticate');
const { cleanCache } = require('../../middleware/cleanCache');
const controller = require('./blog.controller');

const router = express.Router();

router.post('/get', controller.getBlogs);

router.get('/username', authenticate, controller.getBlogsByUsername);

router.get('/:id', controller.getBlogById);

router.post('/', authenticate, cleanCache('blog'), controller.createBlog);

router.delete('/:id', authenticate, cleanCache('blog'), controller.deleteBlogById);

router.patch('/:id', authenticate, cleanCache('blog'), controller.patchBlogById);

module.exports = router;
